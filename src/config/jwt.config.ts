import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const secret = configService.get<string>('ACCESS_JWT_SECRET_KEY');
    const expiresIn = configService.get<string>('ACCESS_JWT_EXPIRED');

    return {
      secret,
      signOptions: { expiresIn },
    };
  },
  inject: [ConfigService],
};
