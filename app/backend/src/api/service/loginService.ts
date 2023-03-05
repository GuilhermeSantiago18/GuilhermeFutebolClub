import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { responseError, response } from '../utils/response';
import { ILogin } from '../Interfaces/IServiceLogin';
import generateToken from '../utils/Jwt';
import IResponse from '../Interfaces/IResponse';
import User from '../../database/models/userModel';

export default class UserService {
  private model: ModelStatic<User> = User;

  async login(body: ILogin): Promise<IResponse> {
    const message = 'Invalid email or password';
    const user = await this.model.findOne({ where: { email: body.email } });
    const regex = /^\S+@\S+\.\S+$/;
    if (!user || !regex.test(body.email)) {
      return responseError(401, message);
    }

    const verifyPassword = bcrypt.compareSync(body.password, user.password);

    if (!verifyPassword || body.password.length < 6) {
      return responseError(401, message);
    }
    const { id, email, role, username } = user;
    const token = generateToken({ id, email, role, username });
    return response(200, { token });
  }
}
