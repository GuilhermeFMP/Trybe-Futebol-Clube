import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import loginRouter from './LoginRouter';
import matchesRouter from './MatchesRouter';
import leaderboardRouter from './LeaderboardRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
