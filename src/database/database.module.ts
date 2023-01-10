import { Module } from '@nestjs/common';
import { databaseProviders } from './typeorm/database.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
