import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();

        const { access_token } = request.session || {};

        try {
            const {id} = await this.jwtService.verifyAsync(
                access_token
            );

            if (id) {
                const user = await this.usersService.findOne(id);
                request.currentUser = user;
            }
        } catch(e) {
        }

        return next.handle();
    }
}