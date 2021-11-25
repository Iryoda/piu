import { compare, hash } from 'bcrypt';
import IHashProvider from '../models/IHashProvider';

export default class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}
