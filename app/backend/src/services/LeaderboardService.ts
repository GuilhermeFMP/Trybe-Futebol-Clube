import { ILeaderboard } from '../interfaces/ILeaderboard';
import TeamsService from './TeamsService';

class LeaderboardService {
  public static async getAllSort(teams: ILeaderboard[]) {
    const leaderboard = teams;
    leaderboard.sort((a, b) => {
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
    return leaderboard;
  }

  public static async filter(value: ILeaderboard[]) {
    const teams = await TeamsService.getAll();
    const result = teams.map((team) => {
      const array = value.filter((time) => time.name === team.teamName);
      return { name: team.teamName,
        totalPoints: array[0].totalPoints + array[1].totalPoints,
        totalGames: array[0].totalGames + array[1].totalGames,
        totalVictories: array[0].totalVictories + array[1].totalVictories,
        totalDraws: array[0].totalDraws + array[1].totalDraws,
        totalLosses: array[0].totalLosses + array[1].totalLosses,
        goalsFavor: array[0].goalsFavor + array[1].goalsFavor,
        goalsOwn: array[0].goalsOwn + array[1].goalsOwn,
        goalsBalance: array[0].goalsBalance + array[1].goalsBalance,
        efficiency: (((array[0].totalPoints + array[1].totalPoints)
          / ((array[0].totalGames + array[1].totalGames) * 3)) * 100).toFixed(2),
      };
    });
    const sortedResults = await this.getAllSort(result);
    return sortedResults;
  }
}

export default LeaderboardService;
