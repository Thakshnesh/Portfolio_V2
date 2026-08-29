import { Router, Request, Response } from 'express';
import { db } from '../database.js';

export const analyticsRouter = Router();

// GET /api/stats or /api/analytics/stats - Live visitor & portfolio statistics
const getStatsHandler = (_req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    return res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch stats.' });
  }
};

analyticsRouter.get('/stats', getStatsHandler);
analyticsRouter.get('/', getStatsHandler);

// POST /api/analytics/event - Record user interaction
analyticsRouter.post('/event', (req: Request, res: Response) => {
  try {
    const { type, detail } = req.body;
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (type) {
      db.recordEvent(type, detail, userAgent);
    }

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Event recording failed.' });
  }
});
