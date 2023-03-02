import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/teamModel';
import IServiceTeam, { ITeam } from '../Interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Teams> = Teams;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findByPk(id: number): Promise<ITeam | null> {
    const teamById = await this.model.findByPk(id);
    return teamById;
  }
}
