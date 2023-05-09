import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @ApiBody({ type: RegisterUserDto, required: true })
    async register(@Body() registerUserDto: RegisterUserDto) {
        if (await this.userService.checkExistsEmail(registerUserDto)) {
            throw new NotAcceptableException(['this email was registered try another.']);
        } else {
            const nu = await this.userService.createNewUser(registerUserDto);
            if (nu) {

            } else {
                
            }
        }
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto, required: true })
    async login(@Body() loginUserDto: LoginUserDto) {
        if (await this.userService.checkExistsEmail(loginUserDto)) {

        } else {
            throw new NotAcceptableException(['this email wasn\'t in the database.']);
        }
    }
}
