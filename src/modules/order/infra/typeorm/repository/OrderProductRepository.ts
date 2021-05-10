import { Repository, EntityRepository, getRepository } from 'typeorm';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { OrderProduct } from '@modules/order/entities/OrderProduct';
import { Order } from '@modules/order/entities/Order';
import IOrderProductRepository from '@modules/order/repository/IOrderProductRepository';

@EntityRepository(OrderProduct)
export class OrderProductRepository implements IOrderProductRepository {
  private ormRepository: Repository<OrderProduct>;

  constructor() {
    this.ormRepository = getRepository(OrderProduct);
  }

  public async findByOrder(order: Order): Promise<OrderProduct[]> {
    return this.ormRepository.find({
      where: { order },
    });
  }

  public async createOrderProduct(
    order: Order,
    listProductStatus: IProductStatus[],
  ): Promise<OrderProduct[]> {
    const listSaveOrderProduct = listProductStatus.map(productStatus => {
      const orderProductCreation = this.ormRepository.create({
        order,
        product: productStatus.productDB,
        qtt: productStatus.qttWanted,
      });
      return orderProductCreation.save();
    });
    return Promise.all(listSaveOrderProduct);
  }
}
