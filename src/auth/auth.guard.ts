import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

/**
 * AuthGuard - Single Responsibility: Validate incoming requests
 *
 * Responsibilities:
 * - Check if route is public
 * - (Optional) Validate user sessions
 *
 * NOT responsible for:
 * - Managing external API tokens (TokenManagerService)
 * - Forwarding requests (ProxyService)
 */
@Injectable()
export class SpecTokenGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check if route is marked as @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // OPTION 1: No authentication (all requests allowed)
    // BFF handles downstream auth internally via TokenManagerService
    return true;

    // OPTION 2: Implement user session validation (if needed)
    // Uncomment the code below if you need to validate user sessions
    // const request = context.switchToHttp().getRequest();
    // const session = request.cookies?.['session'];
    // if (!session) {
    //   throw BusinessException.unauthorized('No user session');
    // }
    // request.user = await this.validateSession(session);
    // return true;
  }
}
