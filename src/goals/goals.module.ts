import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { goalsProviders } from './goals.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GoalsController],
  providers: [...goalsProviders, GoalsService],
})
export class GoalsModule {}
