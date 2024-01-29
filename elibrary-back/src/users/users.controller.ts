import { Body, Controller, Get, Post, Request, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: Record<string, string>) {
        const {access_token} =  await this.authService.signup(body);

        session.access_token = access_token;

        return {
            access_token
        };
    }

    @Post('/signin')
    async signIn(@Body() body: SignInUserDto, @Session() session: Record<string, string>) {
        const {access_token} = await this.authService.signin(body);

        console.log(session);
        
        session.access_token = access_token;

        return {
            access_token
        };
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @UseGuards(AuthGuard)
    @Get('/get_user')
    async getUser(@Request() req) {
        console.log(req.access_token);
        
        return {
            access_token: req.access_token
        };
    }


    @UseGuards(AuthGuard)
    @Post('/update_user')
    async updateUser(@Request() req, @Body() body: UpdateUserDto) {
        console.log(req);
        return this.usersService.update(parseInt(req.user.sub), body);
    }
}
