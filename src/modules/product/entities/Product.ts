import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  image: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => Number)
  @Column()
  price: number;

  @Field(() => Number)
  @Column()
  qttStock: number;
}
