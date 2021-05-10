import { Order } from '@modules/order/entities/Order';
import { ObjectType, Field } from 'type-graphql';
import { Product } from '@modules/product/entities/Product';

@ObjectType()
export class TypeReturnCreateOrder {
  @Field(() => Order)
  order: Order;

  @Field(() => [Product])
  products: Product[];

  @Field(() => String)
  testEmailUrl: string;
}
