import IProductRepository from '@modules/product/repository/IProductRepository';
import { AddProductInput } from '@modules/product/schemas/types-input/AddProductInput';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { Product } from '@modules/product/entities/Product';

export class FakeProductRepository implements IProductRepository {
  public products: Product[] = [];

  public async create(productIntput: AddProductInput): Promise<Product> {
    const product = new Product();
    Object.assign(product, {
      ...productIntput,
    });
    this.products.push(product);
    return product;
  }

  public async findByListIds(listIds: number[]): Promise<Product[]> {
    return this.products.filter(
      fakeProduct => listIds.findIndex(id => id === fakeProduct.id) !== -1,
    );
  }

  public updateStock(listProductsStatus: IProductStatus[]): Promise<void> {
    listProductsStatus
      .filter(productInOrder => !!productInOrder.productDB)
      .forEach(productInOrder => {
        const { productDB, qttWanted } = productInOrder;

        const { qttStock, id } = productDB as Product;
        const productUpdate = this.products.find(prod => prod.id === id);
        Object.assign(productUpdate, {
          ...productUpdate,
          qttStock: qttStock - qttWanted,
        });
      });
    return Promise.resolve();
  }
}
