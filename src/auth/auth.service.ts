import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRequest } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Encryption } from './encryption';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryption: Encryption,
  ) {}

  async register(user: UserRequest): Promise<User> {
    return this.userService.create(user);
  }

  async login(user: UserRequest): Promise<User> {
    const persistedUser = await this.userService.findByEmail(user.email);
    if (this.isCredentialsInvalid(persistedUser, user)) {
      throw new UnauthorizedException();
    }
    return persistedUser;
  }

  private isCredentialsInvalid(persistedUser: User, user: UserRequest) {
    return (
      !persistedUser ||
      persistedUser.password !== this.encryption.encryptPassword(user.password)
    );
  }

  async generateToken(user: User): Promise<string> {
    return Buffer.from(JSON.stringify(user)).toString('base64');
  }

  async validateToken(token: string): Promise<User> {
    const user = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
    return this.userService.findById(user.id);
  }
}
