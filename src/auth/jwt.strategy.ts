import { forwardRef, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export class JwtStrategy extends PassportStrategy(Strategy, 'main') {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {
    const secret = process.env.ACCESS_JWT_SECRET_KEY;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authService.checkUser(payload);

    return user;
  }
}
