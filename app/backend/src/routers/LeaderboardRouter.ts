import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res) => LeaderboardController.getAllHomeSort(req, res),
);

leaderboardRouter.get(
  '/away',
  (req, res) => LeaderboardController.getAllAwaySort(req, res),
);

export default leaderboardRouter;
