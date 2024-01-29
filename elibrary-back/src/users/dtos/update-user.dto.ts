import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    newPassword: string;
}