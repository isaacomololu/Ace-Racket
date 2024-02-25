import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class DoesUserExist implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const userExist = await this.authService.findByEmail(request.body.email);
        if (userExist) {
            throw new ForbiddenException('User already Exist');
        }
        return true;
    }
}