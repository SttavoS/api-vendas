import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

export default class LoginService {
  async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exists on database.", 401);
    }

    const passwordComparation = await compare(password, user.password);

    if (!passwordComparation) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  }
}
