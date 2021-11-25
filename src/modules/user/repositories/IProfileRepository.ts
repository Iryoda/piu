import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import Profile from '../domain/Profile';

export default interface IProfileRepository {
  update(id: string, data: IUpdateProfile): Promise<Profile>;
}
