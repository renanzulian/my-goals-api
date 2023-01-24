import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRequest } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Encryption } from './encryption';
import { JwtService } from '@nestjs/jwt';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryption: Encryption,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: UserRequest): Promise<User> {
    return this.userService.create(user);
  }

  async validateCredentials(user: UserRequest): Promise<UserWithoutPassword> {
    const persistedUser = await this.userService.findByEmail(user.email);
    if (await this.isCredentialsInvalid(persistedUser, user)) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = persistedUser;
    return userWithoutPassword;
  }

  async generateTokenAccess(user: UserWithoutPassword) {
    const payload = { username: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }

  private async isCredentialsInvalid(
    persistedUser: User,
    user: UserRequest,
  ): Promise<boolean> {
    return (
      !persistedUser ||
      !(await this.encryption.comparePassword(
        user.password,
        persistedUser.password,
      ))
    );
  }

  async generateToken(user: UserWithoutPassword): Promise<string> {
    return Buffer.from(JSON.stringify(user)).toString('base64');
  }

  async validateToken(token: string): Promise<User> {
    const user = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
    return this.userService.findById(user.id);
  }
}
