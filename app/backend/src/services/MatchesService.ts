import Teams from '../database/models/Teams';
import Matches from '../database/models/Match';
import IMatchAtributtes from '../interfaces/IMatchAtributtes';
import TeamsService from './TeamsService';

class MatchesService {
  public static async getMatches() {
    const matches = await Matches.findAll(
      { include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }] },
    );
    return matches;
  }

  public static async getInProgress(inProgress: string | undefined) {
    const allMatches = await Matches.findAll(
      { where: { inProgress: inProgress === 'true' },
        include: [{
          model: Teams,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        }] },
    );

    return allMatches;
  }

  public static async finishMatch(id: number) {
    await Matches.update({
      inProgress: false,
    }, {
      where: { id },
    });
    return { message: 'Finished' };
  }

  public static async patchMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });
    return { homeTeamGoals, awayTeamGoals };
  }

  public static async create(match: IMatchAtributtes) {
    const validate = await this.idExist(match.homeTeamId, match.awayTeamId);
    if (validate) {
      return true;
    }
    const newMatch = await Matches.create({
      ...match,
      inProgress: true,
    });
    return newMatch;
  }

  public static async getById(id: number) {
    const matches = await Matches.findAll({
      where: {
        homeTeamId: id,
        inProgress: false,
      },
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  }

  private static async idExist(homeTeamId: number, awayTeamId: number) {
    const home = await TeamsService.getById(homeTeamId);
    const away = await TeamsService.getById(awayTeamId);

    if (typeof home === 'string' || typeof away === 'string') {
      return true;
    }
    return false;
  }
}

export default MatchesService;
