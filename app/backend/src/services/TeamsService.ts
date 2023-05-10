import { ITeam } from '../interfaces/ITeam';
import Teams from '../database/models/Teams';

class TeamsService {
  public static async getAll(): Promise<ITeam[]> {
    const allTeams = await Teams.findAll();
    return allTeams;
  }

  public static async getById(id: number): Promise<ITeam> {
    const findTeam = await Teams.findOne({ where: { id } });
    if (!findTeam) {
      throw new Error('Not Found');
    }
    return findTeam;
  }
}

export default TeamsService;
