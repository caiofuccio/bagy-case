import { InputType, Field } from 'type-graphql';
import { Customer } from '@modules/customer/entities/Customer';

@InputType()
export class AddCustomerInput implements Partial<Customer> {
  id?: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  dtBirth: string;
}
