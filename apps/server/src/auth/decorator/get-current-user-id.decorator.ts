import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtService = new JwtService();

    const accessToken = request.cookies?.accessToken;


    if (!accessToken) {
      console.log("AccessToken not found");
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload = jwtService.decode(accessToken) as { sub: number };

      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid access token');
      }

      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  },
);
