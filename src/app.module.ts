import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoalsModule } from './goals/goals.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, GoalsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
