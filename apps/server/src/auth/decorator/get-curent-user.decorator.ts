import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const jwtService = new JwtService()

    const accessToken = request.cookies?.accessToken

    if (!accessToken) {
      throw new Error('Access token not found')
    }

    try {
      const payload = jwtService.decode(accessToken)

      if (!payload || !payload.sub) {
        throw new Error('Invalid access token')
      }

      return payload
    } catch (error) {
      throw new Error('Invalid access token')
    }
  }
)
