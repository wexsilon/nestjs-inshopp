import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiBody({ type: RegisterUserDto, required: true })
    async signUp(@Body() registerUserDto: RegisterUserDto) {}

    @Post('login')
    @ApiBody({ type: LoginUserDto, required: true })
    async signIn(@Body() UserDto: LoginUserDto) {}
}
