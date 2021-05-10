import { Product } from '../entities/Product';

export interface IProductStatus {
  hasInStock: boolean;
  productDB: Product | undefined;
  qttWanted: number;
  prodId: number;
}
