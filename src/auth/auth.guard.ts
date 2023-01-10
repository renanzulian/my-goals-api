import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!this.hasNotToken(authorization)) return false;
    const token = authorization.split(' ')[1];
    const id = this.getUserAuthenticated(token);
    if (id) {
      request.userId = id;
      return true;
    }
    return false;
  }

  private hasNotToken(auth: string) {
    return !auth || auth.split(' ')[1];
  }

  private getUserAuthenticated(token: string): undefined | number {
    try {
      const user = JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
      return user.id;
    } catch (error: Error | any) {
      Logger.log(error.message);
    }
  }
}
