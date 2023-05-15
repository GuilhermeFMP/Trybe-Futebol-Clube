import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import statusCode from '../utils/statusCode';

class MatchesController {
  public static async getMatches(req: Request, res: Response): Promise<void | Response> {
    const { inProgress } = req.query;
    if (typeof inProgress === 'string') {
      const matches = await MatchesService.getInProgress(inProgress);
      return res.status(statusCode.oK).json(matches);
    }
    const matches = await MatchesService.getMatches();
    return res.status(statusCode.oK).json(matches);
  }
}

export default MatchesController;
