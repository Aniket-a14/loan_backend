import { Router } from 'express';
import { askProductAI } from './askProductAI';
import { authMiddleware } from '../../middleware/authMiddleware';

export const aiRouter = Router();

// Protect all AI routes
aiRouter.use(authMiddleware);

aiRouter.post('/ask', askProductAI);
