import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtPayloadWithRt = any & { refreshToken: string };

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
