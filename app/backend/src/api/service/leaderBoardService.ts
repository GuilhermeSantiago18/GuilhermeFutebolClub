import { ModelStatic } from 'sequelize';
import MatchesModel from '../../database/models/matchesModel';
import Teams from '../../database/models/teamModel';
import ILeaderboard from '../Interfaces/ILeaderboard';
import { objectResult, orderResults, objectAll } from '../utils/leaderBoardFuncs';

export default class LeaderboardService {
  protected modelMatches: ModelStatic<MatchesModel> = MatchesModel;
  protected modelTeams: ModelStatic<Teams> = Teams;

  async getLeaderBoardHome(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const match = getMatches.filter((e) => e.homeTeamId === team.id);
      return objectResult(team.teamName, match, ['homeTeamGoals', 'awayTeamGoals']);
    });

    return orderResults(result);
  }

  async getLeaderBoardAway(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const match = getMatches.filter((e) => e.awayTeamId === team.id);
      return objectResult(team.teamName, match, ['awayTeamGoals', 'homeTeamGoals']);
    });

    return orderResults(result);
  }

  async getLeaderBoardAll(): Promise<ILeaderboard[]> {
    const getTeam = await this.modelTeams.findAll();
    const getMatches = await this.modelMatches.findAll({ where: { inProgress: false } });
    const result: ILeaderboard[] = getTeam.map((team) => {
      const matchHome = getMatches.filter((e) => e.homeTeamId === team.id);
      const matchAway = getMatches.filter((e) => e.awayTeamId === team.id);
      return objectAll(team.teamName, matchHome, matchAway);
    });

    return orderResults(result);
  }
}
