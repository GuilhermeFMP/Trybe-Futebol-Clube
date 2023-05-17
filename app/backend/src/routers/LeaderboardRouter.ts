import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => LeaderboardController.getAllSort(req, res),
);

export default leaderboardRouter;
