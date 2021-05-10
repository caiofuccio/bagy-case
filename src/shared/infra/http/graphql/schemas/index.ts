import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import CustomerResolvers from '@modules/customer/schemas/CustomerResolvers';
import ProductResolvers from '@modules/product/schemas/ProductResolvers';
import OrderResolvers from '@modules/order/schemas/OrderResolvers';

export default async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    validate: false,
    resolvers: [CustomerResolvers, ProductResolvers, OrderResolvers],
  });
  return schema;
};
