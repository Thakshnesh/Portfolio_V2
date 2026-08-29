import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/contact.js';
import { analyticsRouter } from './routes/analytics.js';
import { resumeRouter } from './routes/resume.js';
import { projectsRouter } from './routes/projects.js';
import { chatRouter } from './routes/chat.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    owner: 'Thakshnesh B',
    service: '3D Portfolio Backend Core',
  });
});

// Mount Routes
app.use('/api/contact', contactRouter);
app.use('/api/messages', contactRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/stats', analyticsRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`🚀 Thakshnesh 3D Portfolio Backend running on http://localhost:${PORT}`);
});
