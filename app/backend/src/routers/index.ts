import { Router } from 'express';
import teamsRouter from './TeamsRouter';
import loginRouter from './LoginRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;