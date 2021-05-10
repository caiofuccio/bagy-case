import { InputType, Field } from 'type-graphql';
import { ProductInOrder } from './ProductInOrder';

@InputType()
export class AddOrderInput {
  @Field(() => Number)
  idCustomer: number;

  @Field(() => [ProductInOrder])
  listProducts: ProductInOrder[];

  @Field(() => Number)
  installment: number;
}
