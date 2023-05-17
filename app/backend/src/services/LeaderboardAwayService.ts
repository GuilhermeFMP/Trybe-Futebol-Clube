import { IMatch } from '../interfaces/IMatch';
import MatchesService from './MatchesService';
import TeamsService from './TeamsService';

class LeaderboardAwayService {
  public static async getAllSort() {
    const matches = await this.getAll();
    matches.sort((a, b) => {
      if (b.totalPoints === a.totalPoints) {
        if (b.totalVictories === a.totalVictories) {
          if (b.goalsBalance === a.goalsBalance) {
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
    return matches;
  }

  public static async getAll() {
    const teams = await TeamsService.getAll();

    return Promise.all(teams.map(async (team) => {
      const matches = await MatchesService.getAwayById(team.id);
      return {
        name: team.teamName,
        totalPoints: this.totalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.totalVictories(matches),
        totalDraws: this.totalDraws(matches),
        totalLosses: this.totalLosses(matches),
        goalsFavor: this.goalsFavor(matches),
        goalsOwn: this.goalsOwn(matches),
        goalsBalance: this.goalsBalance(matches),
        efficiency: this.efficiency(matches),
      };
    }));
  }

  private static totalPoints(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => {
      if (el.awayTeamGoals < el.homeTeamGoals) {
        return acc;
      }
      if (el.awayTeamGoals > el.homeTeamGoals) {
        const points = acc + 3;
        return points;
      }
      return acc + 1;
    }, 0);
    return results;
  }

  private static totalVictories(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.awayTeamGoals > el.homeTeamGoals
      ? acc + 1 : acc), 0);
    return results;
  }

  private static totalDraws(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.awayTeamGoals === el.homeTeamGoals
      ? acc + 1 : acc), 0);
    return results;
  }

  private static totalLosses(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => (el.awayTeamGoals < el.homeTeamGoals
      ? acc + 1 : acc), 0);
    return results;
  }

  private static goalsFavor(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => acc + el.awayTeamGoals, 0);
    return results;
  }

  private static goalsOwn(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => acc + el.homeTeamGoals, 0);
    return results;
  }

  private static goalsBalance(matches: IMatch[]) {
    const results = matches.reduce((acc, el) => acc + (el.awayTeamGoals - el.homeTeamGoals), 0);
    return results;
  }

  private static efficiency(matches: IMatch[]) {
    const points = this.totalPoints(matches);
    const match = matches.length;
    return ((points / (match * 3)) * 100).toFixed(2);
  }
}

export default LeaderboardAwayService;
