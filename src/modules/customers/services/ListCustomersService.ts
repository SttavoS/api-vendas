import { getCustomRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class ListCustomersService {
  async execute(): Promise<PaginationAwareObject> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository
      .createQueryBuilder('customers')
      .paginate();

    return customers;
  }
}
