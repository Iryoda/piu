import { JwtPayload } from 'jsonwebtoken';

export default interface ITokenProvider {
  create(subject: string, expiresIn: string): string;
  verify(token: string): JwtPayload | string;
}
