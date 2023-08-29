import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from '../user/models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    if (!cookie) {
      return false;
    }
    try {
      const decodedToken = await this.jwtService.verifyAsync(cookie);
      const user = await this.userService.getUseraUsername(
        decodedToken['username'],
      );
      return user.role === 'admin';
    } catch (error) {
      return false;
    }
  }
}
