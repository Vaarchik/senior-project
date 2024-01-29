import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService
    ) {}

    findOne(id: number) {
        if (!id) {
            return null;
        }

        return this.repo.findOneBy({id})
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: UpdateUserDto) {
        const user = await this.findOne(id);
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (attrs.newPassword) {
            const salt = randomBytes(8).toString('hex');

            const hash = (await scrypt(attrs.newPassword, salt, 32)) as Buffer;

            const result = salt + '.' + hash.toString('hex');

            Object.assign(user, {
                password: result
            })
        }

        Object.assign(user, attrs);

        await this.repo.save(user);


        const payload = { sub: user.id, id: user.id, email: user.email, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.repo.remove(user);
    }

    create(user: CreateUserDto) {
        const createdUser = this.repo.create(user);

        return this.repo.save(createdUser);
    }
}
