import { Customer } from '@modules/customer/entities/Customer';
import { Order } from '@modules/order/entities/Order';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { format } from 'date-fns';
import IOrderRepository from '@modules/order/repository/IOrderRepository';

@EntityRepository(Order)
export class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async createOrder(
    customer: Customer,
    installment: number,
  ): Promise<Order> {
    const orderCreation = this.ormRepository.create({
      customer,
      installment,
      status: 'approved',
      dtOrder: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });
    return orderCreation.save();
  }
}
