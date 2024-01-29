import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { SignInUserDto } from "./dtos/signin-user.dto";
import { JwtService } from "@nestjs/jwt";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signup(userData: SignInUserDto): Promise<{ access_token: string }> {
        const { email, password } = userData;
        console.log('userData', userData);
        

        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        
        const user = await this.usersService.create({email, password: result});

        const payload = { sub: user.id, id: user.id, email: user.email, name: user.name };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signin(userData: SignInUserDto): Promise<{ access_token: string }> {
        const [user] = await this.usersService.find(userData.email);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(userData.password, salt, 32)) as Buffer;

        console.log('storedHash', storedHash, hash.toString('hex'));
        
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Bad password');
        }

        const payload = { sub: user.id, id: user.id, email: user.email, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}