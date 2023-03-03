export interface ILogin {
  email: string;
  password: string;
}

export interface IServiceLogin {
  validateLogin(user: ILogin): Promise<string | null>;
}
