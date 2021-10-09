import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface FindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({ where: { name } });

    return product;
  }

  async findAllByIds(products: FindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
