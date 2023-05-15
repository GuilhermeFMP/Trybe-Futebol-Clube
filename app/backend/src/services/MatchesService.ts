import Teams from '../database/models/Teams';
import Matches from '../database/models/Match';

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
}

export default MatchesService;