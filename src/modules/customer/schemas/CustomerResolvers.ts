import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Customer } from '@modules/customer/entities/Customer';
import { AddAddressInput } from '@modules/address/schemas/types-input/AddAddressInput';
import { CustomerRepository } from '../infra/typeorm/repository/CustomerRepository';
import { AddCustomerInput } from './types-input/AddCustomerInput';

@Resolver()
export default class CustomerResolvers {
  private customerRepository: CustomerRepository = new CustomerRepository();

  @Query(() => [Customer])
  async allCostumers(): Promise<Customer[]> {
    return Customer.find({ relations: ['address', 'orders'] });
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Arg('customer') reqCustomer: AddCustomerInput,
    @Arg('address') reqAddress: AddAddressInput,
  ): Promise<Customer> {
    return this.customerRepository.create(reqAddress, reqCustomer);
  }
}
