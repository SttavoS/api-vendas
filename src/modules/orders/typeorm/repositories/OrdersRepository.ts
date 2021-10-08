import { EntityRepository, Repository } from 'typeorm';
import Customer from '@modules/customers/typeorm/entities/Customer';
import Order from '../entities/Order';

interface Product {
  product_id: string;
  price: number;
  quantity: number;
}

interface CreateOrderDto {
  customer: Customer;
  products: Product[];
}

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {
  async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  async createOrder({ customer, products }: CreateOrderDto): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
