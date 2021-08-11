import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { name },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }
}
