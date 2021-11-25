import Profile from '@modules/user/domain/Profile';
import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import IProfileRepository from '../IProfileRepository';

export default class InMemoryProfileRepository implements IProfileRepository {
  private repository: Profile[] = [];

  public async create(data: Profile): Promise<Profile> {
    this.repository.push(data);
    return data;
  }

  public async update(id: string, data: IUpdateProfile): Promise<Profile> {
    const findProfile = this.repository.find((profile) => profile.id === id);

    const newProfile = Object.assign(findProfile, { ...data });

    const newRepository = this.repository.map((profile) => {
      if (profile.id === id) {
        return newProfile;
      }
      return profile;
    });

    this.repository = newRepository;

    return newProfile;
  }
}
