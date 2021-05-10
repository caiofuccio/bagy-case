import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import schemaResolvers from './schemas/index';

export default async (app: Express): Promise<ApolloServer> => {
  const schema = await schemaResolvers();
  const apolloServer = new ApolloServer({ schema });
  apolloServer.applyMiddleware({ app });
  return apolloServer;
};
