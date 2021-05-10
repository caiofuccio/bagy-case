import { Repository, EntityRepository, getRepository } from 'typeorm';
import IProductRepository from '@modules/product/repository/IProductRepository';
import { Product } from '@modules/product/entities/Product';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { AddProductInput } from '@modules/product/schemas/types-input/AddProductInput';

@EntityRepository(Product)
export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  create(productIntput: AddProductInput): Promise<Product> {
    const productCreation = this.ormRepository.create(productIntput);
    return productCreation.save();
  }

  public async findByListIds(listIds: number[]): Promise<Product[]> {
    return this.ormRepository.findByIds(listIds);
  }

  public async updateStock(
    listProductsStatus: IProductStatus[],
  ): Promise<void> {
    const listProductsStockeUpdate = listProductsStatus
      .filter(productInOrder => !!productInOrder.productDB)
      .map(productInOrder => {
        const { productDB, qttWanted } = productInOrder;
        const { id, qttStock } = productDB as Product;
        return this.ormRepository.update(
          { id },
          { qttStock: qttStock - qttWanted },
        );
      });
    await Promise.all(listProductsStockeUpdate);
  }
}
