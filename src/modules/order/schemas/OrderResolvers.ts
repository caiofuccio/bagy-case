import { Resolver, Mutation, Arg } from 'type-graphql';
import { ProductRepository } from '@modules/product/infra/typeorm/repository/ProductRepository';
import { CustomerRepository } from '@modules/customer/infra/typeorm/repository/CustomerRepository';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import { TypeReturnCreateOrder } from '../entities/TypeReturnCreateOrder';
import { AddOrderInput } from './types-input/AddOrderInput';
import { OrderService } from '../services/order.service';
import { OrderRepository } from '../infra/typeorm/repository/OrderRepository';
import { OrderProductRepository } from '../infra/typeorm/repository/OrderProductRepository';

@Resolver()
export default class OrderResolvers {
  public orderService = new OrderService(
    new OrderRepository(),
    new OrderProductRepository(),
    new ProductRepository(),
    new CustomerRepository(),
    new EtherealMailProvider(),
  );

  @Mutation(() => TypeReturnCreateOrder)
  async createOrder(
    @Arg('order') reqOrder: AddOrderInput,
  ): Promise<TypeReturnCreateOrder> {
    const orderCreated = await this.orderService.execute(reqOrder);
    return orderCreated;
  }
}
