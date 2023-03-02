import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/teamModel';
import IServiceTeam, { ITeam } from '../Interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Teams> = Teams;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam> {
    const teamforId = await this.model.findByPk(id);
    if (!teamforId) throw new Error('Method not implemented.');
    return teamforId;
  }
}
