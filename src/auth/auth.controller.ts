import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { SignInUserDto } from './dtos/signin-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Post('signup')
    @ApiBody({ type: SignUpUserDto, required: true })
    async signUp(@Body() signUpUserDto: SignUpUserDto) {}

    @Post('signin')
    @ApiBody({ type: SignInUserDto, required: true })
    async signIn(@Body() signInUserDto: SignInUserDto) {}
}
