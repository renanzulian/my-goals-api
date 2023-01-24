import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDTO, SignInResponseDTO, SignUpResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: AuthDTO): Promise<SignUpResponseDTO> {
    await this.authService.register(body);
    return { message: 'User created' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Req() req): Promise<SignInResponseDTO> {
    const user = req.user;
    Logger.log(user);
    return this.authService.generateTokenAccess(user);
  }
}
