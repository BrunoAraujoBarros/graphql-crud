import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { GqlExecutionContext } from '@nestjs/graphql';
  import { AuthGuard } from '@nestjs/passport';
  import { IS_PUBLIC_KEY } from 'decorators/is-public.decorator';
  import { UnauthorizedError } from 'erros/unauthorized.erros';
  
  @Injectable()
  export class GqlAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
      super();
    }
  
    getRequest(context: ExecutionContext) {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (isPublic) {
        return true;
      }
  
      const canActivate = super.canActivate(context);
  
      if (typeof canActivate === 'boolean') {
        return canActivate;
      }
  
      const canActivatePromise = canActivate as Promise<boolean>;
  
      return canActivatePromise.catch((error) => {
        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException(error.message);
        }
  
        throw new UnauthorizedException();
      });
    }
  }
  