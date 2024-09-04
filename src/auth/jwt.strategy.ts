import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Utilize a chave secreta do seu JWT
    });
  }

  async validate(payload: any) {
    // Valide o usuário com o payload do JWT
    return { userId: payload.sub, name: payload.name };
  }
}
