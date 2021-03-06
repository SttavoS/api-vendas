import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

export default class DeleteCustomerService {
  async execute(id: string): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    await customersRepository.remove(customer);
  }
}
