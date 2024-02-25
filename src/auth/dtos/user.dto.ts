import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    readonly name: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()

    readonly password: string;

    @IsNotEmpty()
    readonly type: 'basic' | 'regular' | 'vip';;
}