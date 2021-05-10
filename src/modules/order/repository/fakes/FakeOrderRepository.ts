import { Customer } from '@modules/customer/entities/Customer';
import { Order } from '@modules/order/entities/Order';
import { format } from 'date-fns';
import IOrderRepository from '@modules/order/repository/IOrderRepository';

export class FakeOrderRepository implements IOrderRepository {
  public async createOrder(
    customer: Customer,
    installment: number,
  ): Promise<Order> {
    const order = new Order();
    Object.assign(order, {
      id: 1,
      customer,
      installment,
      status: 'approved',
      dtOrder: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });
    return order;
  }
}
