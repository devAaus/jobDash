import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentTokens = createParamDecorator(
   (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest()

      try {
         const tokens = request.cookies
         console.log("Tokens", tokens)


         if (!tokens) {
            throw new Error('Access token not found')
         }

         return tokens
      } catch (error) {
         throw new Error('Invalid access token')
      }
   }
)
