import prisma from '@shared/prisma/client';
import Profile from '@modules/user/domain/Profile';
import IUpdateProfile from '@modules/user/dtos/profile/IUpdateProfile';
import IProfileRepository from '../IProfileRepository';

export default class ProfileRepository implements IProfileRepository {
  public async update(id: string, data: IUpdateProfile): Promise<Profile> {
    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedProfile;
  }
}
