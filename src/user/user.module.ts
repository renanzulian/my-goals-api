import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  providers: [...userProviders, UserService],
  exports: [...userProviders, UserService],
})
export class UserModule {}
