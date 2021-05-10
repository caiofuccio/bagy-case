import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { Product } from '@modules/product/entities/Product';
import { AddProductInput } from '../schemas/types-input/AddProductInput';

export default interface IProductRepository {
  updateStock(listProductsStatus: IProductStatus[]): Promise<void>;
  findByListIds(listIds: number[]): Promise<Product[]>;
  create(productIntput: AddProductInput): Promise<Product>;
}
