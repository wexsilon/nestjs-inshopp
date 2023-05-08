import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInUserDto {
    @ApiProperty({
        example: 'thread8@gmail.com',
        name: 'email',
        nullable: false,
        required: true,
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1234ThrEAd8@',
        name: 'password',
        nullable: false,
        required: true,
    })
    @IsStrongPassword()
    password: string;
}
