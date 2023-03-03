import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';

class JWTToken {
  private secret = 'jwt_secret';

  createToken(payload: IToken): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  authToken(token: string): IToken {
    const payload = jwt.verify(token, this.secret) as IToken;
    return payload;
  }
}

export default JWTToken;
