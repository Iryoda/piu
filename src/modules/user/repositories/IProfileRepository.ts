import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import Profile from '../domain/Profile';
import ICreateProfile from '../dtos/profile/ICreateProfile';

export default interface IProfileRepository {
  create(data: ICreateProfile): Promise<Profile>;
  update(id: string, data: IUpdateProfile): Promise<Profile>;
}
