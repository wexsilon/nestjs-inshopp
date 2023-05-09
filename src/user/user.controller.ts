import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('user')
export class UserController {
    @Post('register')
    @ApiBody({ type: RegisterUserDto, required: true })
    async signUp(@Body() registerUserDto: RegisterUserDto) {
        
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto, required: true })
    async signIn(@Body() UserDto: LoginUserDto) {}
}
