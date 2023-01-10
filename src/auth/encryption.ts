import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class Encryption {
  encryptPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  comparePassword(password: string, encryptedPassword: string): boolean {
    return this.encryptPassword(password) === encryptedPassword;
  }
}
