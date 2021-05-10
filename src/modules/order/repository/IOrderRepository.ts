import { Order } from '@modules/order/entities/Order';
import { Customer } from '@modules/customer/entities/Customer';

export default interface IOrderRepository {
  createOrder(customer: Customer, installment: number): Promise<Order>;
}
