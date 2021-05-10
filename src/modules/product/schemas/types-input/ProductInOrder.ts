import { InputType, Field } from 'type-graphql';

@InputType()
export class ProductInOrder {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  qtt: number;
}
