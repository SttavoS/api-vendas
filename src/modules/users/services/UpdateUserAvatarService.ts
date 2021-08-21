import { AppError } from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    // TODO: Refact into another method!
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExits = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExits) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
