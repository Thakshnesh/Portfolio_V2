import { Router, Request, Response } from 'express';
import { db } from '../database.js';

export const contactRouter = Router();

// POST /api/contact - Submit new message
contactRouter.post('/', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    const savedMessage = db.addMessage({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      subject: subject ? String(subject).trim() : 'Portfolio Contact Submission',
      message: String(message).trim(),
      ip: String(clientIp),
    });

    db.recordEvent('page_view', `Message received from ${name}`);

    return res.status(201).json({
      success: true,
      message: 'Message delivered successfully to Thakshnesh B! You will receive a response shortly.',
      data: savedMessage,
    });
  } catch (err) {
    console.error('Contact route error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing contact submission.',
    });
  }
});

// GET /api/messages or /api/messages/all - Retrieve all messages (for admin dashboard / live inbox modal)
const getMessagesHandler = (_req: Request, res: Response) => {
  try {
    const messages = db.getMessages();
    return res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch messages.' });
  }
};

contactRouter.get('/all', getMessagesHandler);
contactRouter.get('/', getMessagesHandler);

// PATCH /api/messages/:id/read - Mark as read
contactRouter.patch('/:id/read', (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = db.markMessageRead(id);
  if (updated) {
    return res.json({ success: true, message: 'Marked as read' });
  }
  return res.status(404).json({ success: false, error: 'Message not found' });
});

// DELETE /api/messages/:id - Delete message
contactRouter.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteMessage(id);
  if (deleted) {
    return res.json({ success: true, message: 'Message deleted' });
  }
  return res.status(404).json({ success: false, error: 'Message not found' });
});
