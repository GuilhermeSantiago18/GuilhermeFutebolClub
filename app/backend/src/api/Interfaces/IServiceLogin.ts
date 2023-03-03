export interface ILogin {
  validateLogin(email: string, password: string): Promise<string | null>;
}
