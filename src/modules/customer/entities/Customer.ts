import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '@modules/order/entities/Order';
import { Address } from '@modules/address/entities/Address';

@Entity()
@ObjectType()
export class Customer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  cpf: string;

  @Field(() => String)
  @Column('text')
  dtBirth: string;

  @Field(() => Address)
  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Field(() => [Order])
  @OneToMany(type => Order, order => order.customer)
  orders: Order[];
}
