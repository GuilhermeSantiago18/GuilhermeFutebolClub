export interface ILogin {
  email: string;
  password: string;
}

export default interface IServiceLogin {
  validateLogin(user: ILogin): Promise<string>;
}
