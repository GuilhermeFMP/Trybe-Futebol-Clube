import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req, res) => MatchesController.getMatches(req, res),
);

export default matchesRouter;
