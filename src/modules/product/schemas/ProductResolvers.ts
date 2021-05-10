import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { AddProductInput } from './types-input/AddProductInput';
import { Product } from '../entities/Product';

@Resolver()
export default class ProductResolvers {
  @Query(() => [Product])
  async allProducts(): Promise<Product[]> {
    return Product.find();
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg('product') reqProduct: AddProductInput,
  ): Promise<Product> {
    const producCreation = Product.create(reqProduct);
    const product = await producCreation.save();
    return product;
  }
}
