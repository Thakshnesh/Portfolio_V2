import { Router, Request, Response } from 'express';
import { db } from '../database.js';

export const projectsRouter = Router();

// GET /api/projects - Projects list and like stats
projectsRouter.get('/', (_req: Request, res: Response) => {
  const stats = db.getStats();
  return res.json({
    success: true,
    likes: stats.projectLikes,
  });
});

// POST /api/projects/:id/like - Like a project
projectsRouter.post('/:id/like', (req: Request, res: Response) => {
  const { id } = req.params;
  const newLikes = db.likeProject(id);
  db.recordEvent('project_sim_run', `Liked project ${id}`);
  return res.json({
    success: true,
    projectId: id,
    likes: newLikes,
  });
});
