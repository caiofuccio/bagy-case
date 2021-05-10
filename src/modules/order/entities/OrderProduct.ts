import { Order } from '@modules/order/entities/Order';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, Index } from 'typeorm';
import { Product } from '@modules/product/entities/Product';

@Entity()
@Index(['order', 'product'], { unique: true })
@ObjectType()
export class OrderProduct extends BaseEntity {
  @Field(() => Order)
  @ManyToOne(type => Order, {
    primary: true,
    eager: true,
  })
  order: Order;

  @Field(() => Product)
  @ManyToOne(type => Product, {
    primary: true,
    eager: true,
  })
  product: Product;

  @Field(() => Number)
  @Column()
  qtt: number;
}
