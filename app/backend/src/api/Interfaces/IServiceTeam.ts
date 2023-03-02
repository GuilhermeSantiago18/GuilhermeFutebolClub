export interface ITeam {
  id?: number;
  teamName: string;
}

export default interface IServiceTeam {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam>;
}
