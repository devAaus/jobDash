import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../types'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
        return request?.cookies?.accessToken;
      }]),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
