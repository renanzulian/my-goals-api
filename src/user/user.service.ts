import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserRequest } from './user.model';
import { Encryption } from 'src/auth/encryption';

@Injectable()
export class UserService {
  private users: User[] = [];
  private counter = 1000;

  constructor(private readonly encryption: Encryption) {}

  create(user: UserRequest): Promise<User> {
    if (this.isEmailPersisted(user.email)) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const newUser = {
      ...user,
      password: this.encryptPassword(user.password),
      id: this.counter++,
    };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  private isEmailPersisted(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  private encryptPassword(password: string): string {
    return this.encryption.encryptPassword(password);
  }

  findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return Promise.resolve(user);
  }

  findById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return Promise.resolve(user);
  }
}
