import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Customer } from '@modules/customer/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repository/ICustomerRepository';
import { AddAddressInput } from '@modules/address/schemas/types-input/AddAddressInput';
import { Address } from '@modules/address/entities/Address';
import { AddCustomerInput } from '@modules/customer/schemas/types-input/AddCustomerInput';

@EntityRepository(Customer)
export class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findeById(id: number): Promise<Customer | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async create(
    reqAddress: AddAddressInput,
    reqCustomer: AddCustomerInput,
  ): Promise<Customer> {
    const addressCreation = Address.create(reqAddress);
    const addressCreated = await addressCreation.save();

    const customerCreation = Customer.create({
      ...reqCustomer,
      address: addressCreated,
    });

    const customer = await customerCreation.save();
    return customer;
  }
}
