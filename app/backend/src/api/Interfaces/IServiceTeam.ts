import Teams from '../../database/models/teamModel';

export default interface IServiceTeam {
  findAll(): Promise<Teams[]>;
}
