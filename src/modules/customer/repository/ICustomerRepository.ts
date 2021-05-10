import { Customer } from '@modules/customer/entities/Customer';
import { AddCustomerInput } from '@modules/customer/schemas/types-input/AddCustomerInput';
import { AddAddressInput } from '@modules/address/schemas/types-input/AddAddressInput';

export interface ICustomerRepository {
  findeById(id: number): Promise<Customer | undefined>;
  create(
    reqAddress: AddAddressInput,
    customerInput: AddCustomerInput,
  ): Promise<Customer>;
}
