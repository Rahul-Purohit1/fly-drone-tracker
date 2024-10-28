import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    console.log("context....",context);
    const request = context.switchToHttp().getRequest();
    console.log("Request Headers:", request.headers);
    const data=await super.canActivate(context)
    console.log("data....",data);
    
    // Add custom authentication logic here if needed
    return data as boolean;
  }
}