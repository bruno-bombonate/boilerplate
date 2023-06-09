import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_BOILERPLATE_ADMINISTRATOR_API_SECRET_KEY
    });
  }

  public async validate(payload: any): Promise<any> {
    return { id: payload.id };
  }

}
