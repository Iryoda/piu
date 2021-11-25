import ITokenProvider from '../models/ITokenProvider';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import auth from '@config/auth';

export default class TokenProvider implements ITokenProvider {
  public create(subject: string, expiresIn: string): string {
    return sign(subject, expiresIn);
  }

  public verify(token: string): string | JwtPayload {
    return verify(token, auth.secret!);
  }
}
