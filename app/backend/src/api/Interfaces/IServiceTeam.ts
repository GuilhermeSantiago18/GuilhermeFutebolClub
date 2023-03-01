import Teams from '../models/teamModel';

export default interface IServiceTeam {
  findAll(): Promise<Teams>;
}
