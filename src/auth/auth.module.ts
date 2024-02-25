import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.providers';
import { LocalStrategy } from 'src/common/passport_strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/passport_strategies/jwt.strategy';

@Module({
  providers: [AuthService, 
    ...authProviders,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController]
})
export class AuthModule {}
