import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as any;
    return user.id;
  },
);
