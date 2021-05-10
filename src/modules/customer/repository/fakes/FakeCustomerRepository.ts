import { Customer } from '@modules/customer/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repository/ICustomerRepository';
import { AddAddressInput } from '@modules/address/schemas/types-input/AddAddressInput';
import { Address } from '@modules/address/entities/Address';
import { AddCustomerInput } from '@modules/customer/schemas/types-input/AddCustomerInput';

export class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async findeById(id: number): Promise<Customer | undefined> {
    return this.customers.find(customerFake => customerFake.id === id);
  }

  public async create(
    reqAddress: AddAddressInput,
    reqCustomer: AddCustomerInput,
  ): Promise<Customer> {
    const addressCreated = new Address();
    Object.assign(addressCreated, {
      ...reqAddress,
    });
    const customer = new Customer();
    Object.assign(customer, {
      ...reqCustomer,
      address: addressCreated,
    });
    this.customers.push(customer);
    return customer;
  }
}
