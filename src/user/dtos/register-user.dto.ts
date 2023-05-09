import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword, Matches } from 'class-validator';
import { IEmail } from './email.interface';

export class RegisterUserDto implements IEmail {
    @ApiProperty({
        example: 'thread8th',
        name: 'username',
        nullable: false,
        required: true,
    })
    @Matches(RegExp('^[a-zA-Z][a-zA-Z0-9_]{8,}$'), {
        message:
            'name most greater than 7 and start with alphabet and just contain number or alphabet',
    })
    username: string;

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
