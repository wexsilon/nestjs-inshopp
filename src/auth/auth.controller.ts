import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { SignInUserDto } from './dtos/signin-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiBody({ type: SignUpUserDto, required: true })
    async signUp(@Body() signUpUserDto: SignUpUserDto) {}

    @Post('signin')
    @ApiBody({ type: SignInUserDto, required: true })
    async signIn(@Body() signInUserDto: SignInUserDto) {}
}
