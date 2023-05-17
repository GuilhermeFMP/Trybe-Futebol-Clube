import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import statusCode from '../utils/statusCode';

class LeaderboardController {
  public static async getAllSort(req: Request, res: Response): Promise<void | Response> {
    const leaderboard = await LeaderboardService.getAllSort();
    res.status(statusCode.oK).json(leaderboard);
  }
}

export default LeaderboardController;
