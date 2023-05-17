import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/LeaderboardHomeService';
import LeaderboardAwayService from '../services/LeaderboardAwayService';
import statusCode from '../utils/statusCode';

class LeaderboardController {
  public static async getAllHomeSort(req: Request, res: Response): Promise<void | Response> {
    const leaderboard = await LeaderboardHomeService.getAllSort();
    res.status(statusCode.oK).json(leaderboard);
  }

  public static async getAllAwaySort(req: Request, res: Response): Promise<void | Response> {
    const leaderboard = await LeaderboardAwayService.getAllSort();
    res.status(statusCode.oK).json(leaderboard);
  }
}

export default LeaderboardController;
