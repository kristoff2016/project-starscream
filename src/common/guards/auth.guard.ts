import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';

@Guard()
export class AuthGuard implements CanActivate {
  async canActivate(request, context: ExecutionContext): Promise<boolean> {
    // console.log('dataOrRequest', dataOrRequest);
    const { parent, handler } = context;
    console.log('parent', parent);
    console.log('handler', handler);
    return false;
  }
}
