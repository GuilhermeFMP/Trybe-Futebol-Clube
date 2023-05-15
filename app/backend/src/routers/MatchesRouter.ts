import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';
import validateTeamLogic from '../middlewares/validateTeamLogic';

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req, res) => MatchesController.getMatches(req, res),
);

matchesRouter.post(
  '/',
  validateToken,
  validateTeamLogic,
  (req, res) => MatchesController.create(req, res),
);

matchesRouter.patch(
  '/:id',
  validateToken,
  (req, res) => MatchesController.patchMatch(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  validateToken,
  (req, res) => MatchesController.finishMatch(req, res),
);

export default matchesRouter;
