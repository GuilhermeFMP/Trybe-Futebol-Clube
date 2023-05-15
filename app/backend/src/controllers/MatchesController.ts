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

  public static async finishMatch(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const finish = await MatchesService.finishMatch(+id);
    return res.status(statusCode.oK).json(finish);
  }

  public static async patchMatch(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const patch = await MatchesService.patchMatch(+id, homeTeamGoals, awayTeamGoals);
    return res.status(statusCode.oK).json(patch);
  }
}

export default MatchesController;
