import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export default class CustomersRepository extends Repository<Customer> {
  async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { name },
    });

    return customer;
  }

  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { id },
    });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: { email },
    });

    return customer;
  }
}
