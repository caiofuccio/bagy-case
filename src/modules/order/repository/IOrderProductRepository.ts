import { OrderProduct } from '@modules/order/entities/OrderProduct';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { Order } from '@modules/order/entities/Order';

export default interface IOrderProductRepository {
  createOrderProduct(
    order: Order,
    listProductStatus: IProductStatus[],
  ): Promise<OrderProduct[]>;

  findByOrder(order: Order): Promise<OrderProduct[]>;
}
