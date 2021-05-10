import { Customer } from '@modules/customer/entities/Customer';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column('text')
  dtOrder: string;

  @Field(() => Number)
  @Column()
  installment: number;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => Customer)
  @ManyToOne(type => Customer, customer => customer.orders)
  customer: Customer;
}
