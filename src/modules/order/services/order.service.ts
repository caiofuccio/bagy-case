import { Customer } from '@modules/customer/entities/Customer';
import { ICustomerRepository } from '@modules/customer/repository/ICustomerRepository';
import { AddOrderInput } from '@modules/order/schemas/types-input/AddOrderInput';
import { Product } from '@modules/product/entities/Product';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import IProductRepository from '@modules/product/repository/IProductRepository';
import { ProductInOrder } from '@modules/product/schemas/types-input/ProductInOrder';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { Order } from '../entities/Order';
import IOrderProductRepository from '../repository/IOrderProductRepository';
import IOrderRepository from '../repository/IOrderRepository';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private orderProductRepository: IOrderProductRepository,
    private productRepository: IProductRepository,
    private customerRepository: ICustomerRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(reqOrder: AddOrderInput): Promise<{
    order: Order;
    products: Product[];
    testEmailUrl: string;
  }> {
    const { listProducts, idCustomer, installment } = reqOrder;
    const customer = await this.customerRepository.findeById(idCustomer);
    if (!customer) {
      throw Error(`Customer was not found.`);
    }

    const prodIds = [];
    for (let i = 0; i < listProducts.length; i += 1) {
      prodIds.push(listProducts[i].id);
    }
    const products = await this.productRepository.findByListIds(prodIds);

    const listProductStatus = listProducts.map(prodInOrder =>
      this.createListProductStatus(prodInOrder, products),
    );
    listProductStatus.forEach(prodStatus => {
      if (!prodStatus.productDB) {
        throw Error(`Product ${prodStatus.prodId} was not found.`);
      }
      if (!prodStatus.hasInStock) {
        throw Error(`Product ${prodStatus.productDB.name} out of stock.`);
      }
    });

    const orderSaved = await this.orderRepository.createOrder(
      customer,
      installment,
    );
    const testEmailUrl = await this.sendEmailOrder(customer, orderSaved);
    await this.productRepository.updateStock(listProductStatus);
    await this.orderProductRepository.createOrderProduct(
      orderSaved,
      listProductStatus,
    );
    const orderProducts = await this.orderProductRepository.findByOrder(
      orderSaved,
    );
    return {
      testEmailUrl: typeof testEmailUrl === 'string' ? testEmailUrl : '',
      order: orderSaved,
      products: orderProducts.map(orderProd => orderProd.product),
    };
  }

  private createListProductStatus(
    prodInOrder: ProductInOrder,
    products: Product[],
  ): IProductStatus {
    const productDB = products.find(prod => prod.id === prodInOrder.id);
    const hasInStock = this.checkStockAvailable(prodInOrder, productDB);
    return {
      hasInStock,
      productDB,
      qttWanted: prodInOrder.qtt,
      prodId: prodInOrder.id,
    };
  }

  private async sendEmailOrder(
    customer: Customer,
    order: Order,
  ): Promise<string | boolean> {
    const { email } = customer;
    const resultMessageUrl = await this.mailProvider.sendEmail(
      email,
      `Order approved ${order.id}`,
      `Order ${order.id}`,
    );
    return resultMessageUrl;
  }

  public checkStockAvailable(
    prodInOrder: ProductInOrder,
    product: Product | undefined,
  ): boolean {
    if (!product) {
      return false;
    }
    const { qttStock: qttInStock } = product;
    const { qtt: qttToBuy } = prodInOrder;
    return qttInStock >= qttToBuy;
  }
}
