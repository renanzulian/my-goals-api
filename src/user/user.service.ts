import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User, UserRequest } from './user.model';
import { Encryption } from 'src/auth/encryption';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private users: User[] = [];
  private counter = 1000;

  constructor(
    private readonly encryption: Encryption,
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserRequest): Promise<User> {
    if (await this.isEmailPersisted(user.email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = {
      ...user,
      password: this.encryptPassword(user.password),
      id: this.counter++,
    };
    const persistedUser = await this.userRepository.save(newUser);
    return persistedUser;
  }

  private async isEmailPersisted(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }

  private encryptPassword(password: string): string {
    return this.encryption.encryptPassword(password);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
