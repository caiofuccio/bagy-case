import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { OrderProduct } from '@modules/order/entities/OrderProduct';
import { Order } from '@modules/order/entities/Order';
import IOrderProductRepository from '@modules/order/repository/IOrderProductRepository';

export class FakeOrderProductRepository implements IOrderProductRepository {
  private orders: OrderProduct[] = [];

  public async findByOrder(order: Order): Promise<OrderProduct[]> {
    return this.orders.filter(orderFake => orderFake.order.id === order.id);
  }

  public async createOrderProduct(
    order: Order,
    listProductStatus: IProductStatus[],
  ): Promise<OrderProduct[]> {
    this.orders = listProductStatus.map(productStatus => {
      const orderProduct = new OrderProduct();
      Object.assign(orderProduct, {
        order,
        product: productStatus.productDB,
        qtt: productStatus.qttWanted,
      });
      return orderProduct;
    });
    return Promise.all(this.orders);
  }
}
