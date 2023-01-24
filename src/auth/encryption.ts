import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const BCRYPT_SALT = 11;

@Injectable()
export class Encryption {
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_SALT);
  }

  async comparePassword(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}
