import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthDTO, SignInResponseDTO, SignUpResponseDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() body: AuthDTO): Promise<SignUpResponseDTO> {
    await this.authService.register(body);
    return { message: 'User created' };
  }

  @Post('sign-in')
  async signIn(@Body() body: AuthDTO): Promise<SignInResponseDTO> {
    const user = await this.authService.login(body);
    Logger.log(user);
    const token = await this.authService.generateToken(user);
    return { token, userId: user.id };
  }
}
