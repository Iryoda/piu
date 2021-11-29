import Profile from '@modules/user/domain/Profile';
import ICreateProfile from '@modules/user/dtos/profile/ICreateProfile';
import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import IProfileRepository from '../IProfileRepository';
import { v4 } from 'uuid';

export default class InMemoryProfileRepository implements IProfileRepository {
  private repository: Profile[] = [];

  public async create(data: ICreateProfile): Promise<Profile> {
    const profile: Profile = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    this.repository.push(profile);

    return profile;
  }

  public async update(id: string, data: IUpdateProfile): Promise<Profile> {
    const findProfile = this.repository.find((profile) => profile.id === id)!;

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
