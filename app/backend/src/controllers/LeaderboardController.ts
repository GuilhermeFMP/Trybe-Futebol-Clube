import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import statusCode from '../utils/statusCode';

class LeaderboardController {
  public static async getAll(req: Request, res: Response): Promise<void | Response> {
    const leaderboard = await LeaderboardService.getAll();
    res.status(statusCode.oK).json(leaderboard);
  }
}

export default LeaderboardController;
