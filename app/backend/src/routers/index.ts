import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import matchesRouter from './MatchesRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
