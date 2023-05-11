import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import statusCode from '../utils/statusCode';

class TeamsController {
  constructor(private teamService = new TeamsService()) {}
  public static async getAll(_req: Request, res: Response): Promise<void | Response> {
    const teams = await TeamsService.getAll();
    return res.status(statusCode.oK).json(teams);
  }

  public static async getById(req: Request, res: Response): Promise<void | Response> {
    const { id } = req.params;
    const team = await TeamsService.getById(+id);
    return res.status(statusCode.oK).json(team);
  }
}

export default TeamsController;
