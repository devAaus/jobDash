import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// check if the route is public
		const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
			context.getHandler(),
			context.getClass(),
		])
		if (isPublic) {
			return true
		}
		try {
			const result = await super.canActivate(context);
			return result as boolean;
		} catch (error) {
			console.error('JWT authentication failed:', error);
			throw new UnauthorizedException('Unauthorized access');
		} // this will execute jwt strategy
	}
}
