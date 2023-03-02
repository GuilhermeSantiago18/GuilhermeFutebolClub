export interface ITeam {
  id?: number;
  teamName: string;
}

export default interface IServiceTeam {
  findAll(): Promise<ITeam[]>;
  findByPk(id: number): Promise<ITeam | null>;
}
