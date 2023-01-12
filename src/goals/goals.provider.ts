import { DataSource } from 'typeorm';

export const goalsProviders = [
  {
    provide: 'GOALS_REPOSITORY',
    useFactory: (connection: DataSource) => connection.createEntityManager(),
    inject: ['DATA_SOURCE'],
  },
];
