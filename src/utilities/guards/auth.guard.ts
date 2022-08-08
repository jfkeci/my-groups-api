import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/resources/users/service/users.service';

interface JwtPayloadId extends jwt.JwtPayload {
  id?: any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextName = context.getClass().name;
    const req = context.switchToHttp().getRequest();

    if (!this.ignoreAuth(contextName)) {
      const id = getIdFromToken(req);
      if (!id) throw new UnauthorizedException();
      return this.authUser(id);
    }

    return true;
  }

  /**
   * Add controllers that AuthGuard will ignore
   *
   * @param context string
   * @returns boolean
   */
  private ignoreAuth(context): boolean {
    const ignoredControllers = ['AuthController'];

    return (
      process.env.NODE_ENV === 'development' &&
      ignoredControllers.includes(context)
    );
  }

  private async authUser(userId: string | null): Promise<boolean> {
    if (!userId) return false;

    try {
      const user = await this.userService._findOne({ id: Number(userId) });

      if (!user) return false;
    } catch (err) {
      return false;
    }

    return true;
  }
}

export const getIdFromToken = (req: Request): string | null | undefined => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }

  if (token) {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtPayloadId;

    return decoded.id;
  }

  return null;
};
