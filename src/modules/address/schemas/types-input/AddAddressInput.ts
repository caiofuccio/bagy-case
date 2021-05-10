import { InputType, Field } from 'type-graphql';
import { Address } from '@modules/address/entities/Address';

@InputType()
export class AddAddressInput implements Partial<Address> {
  id?: number;

  @Field(() => String)
  street: string;

  @Field(() => String)
  neighborhood: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  cep: string;

  @Field(() => String)
  number: string;
}
