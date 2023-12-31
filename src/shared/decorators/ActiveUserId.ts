import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const { userId } = request;

  if (!userId) throw new UnauthorizedException();

  return userId;
});
