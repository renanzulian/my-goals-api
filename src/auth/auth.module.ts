import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { Encryption } from './encryption';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService, Encryption, AuthGuard],
  exports: [Encryption, AuthGuard],
})
export class AuthModule {}
