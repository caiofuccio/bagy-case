import { Product } from '@modules/product/entities/Product';
import { InputType, Field } from 'type-graphql';

@InputType()
export class AddProductInput implements Partial<Product> {
  id?: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  qttStock: number;
}
