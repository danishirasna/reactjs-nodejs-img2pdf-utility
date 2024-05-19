import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Constants, Role } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // what is the required role
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      Constants.ROLE,
      [context.getHandler(), context.getClass()],
    );

    //if requiredRoles Not found just let Request pass
    if (!requiredRoles) return true;

    //current user making the request has that roles

    const { user } = context.switchToHttp().getRequest();

    // is at least one  of the require roles a role  that the user has

    return requiredRoles.some((role) => user.role === role);
  }
}
