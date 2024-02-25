import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: process.env.JWTKEY,
        });
    }

    async validate(payload: any) {
        const user = await this.authService.findById(payload.id);
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return payload;
    }
}