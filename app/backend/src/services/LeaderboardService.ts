import { IMatch } from '../interfaces/IMatch';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

class LeaderboardService {
  public static async getAll() {
    const teams = await TeamsService.getAll();

    return Promise.all(teams.map(async (team) => {
      const matches = await MatchesService.getById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.totalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.totalVictories(matches),
        totalDraws: this.totalDraws(matches),
        totalLosses: this.totalLosses(matches),
        goalsFavor: this.goalsFavor(matches),
        goalsOwn: this.goalsOwn(matches),
      };
    }));
  }

  private static totalPoints(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 0 : acc + el.homeTeamGoals), 0);
    return results;
  }

  private static totalVictories(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 0 : acc + 1), 0);
    return results;
  }

  private static totalDraws(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.homeTeamGoals === el.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return results;
  }

  private static totalLosses(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.homeTeamGoals < el.awayTeamGoals
      ? acc + 1 : acc + 0), 0);
    return results;
  }

  private static goalsFavor(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => acc + el.homeTeamGoals, 0);
    return results;
  }

  private static goalsOwn(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => acc + el.awayTeamGoals, 0);
    return results;
  }
}

export default LeaderboardService;
