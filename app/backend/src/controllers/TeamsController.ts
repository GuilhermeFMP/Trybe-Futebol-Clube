import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  public static async getAll(req: Request, res: Response) {
    const teams = await TeamsService.getAll();
    return res.status(200).json(teams);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamsService.getById(+id);
    return res.status(200).json(team);
  }
}

export default TeamsController;
