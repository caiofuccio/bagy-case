import { createConnection } from 'typeorm';

export default async (): Promise<void> => {
  const connection = await createConnection();
  await connection.synchronize();
};
