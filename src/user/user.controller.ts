import {
    Body,
    Controller,
    NotAcceptableException,
    Post,
    Get,
    Param,
    ParseUUIDPipe,
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from './user.service';
import { MailService } from 'src/mail/mail.service';
import { RegisterResponse } from './responses/register.reponse';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    @Post('register')
    @ApiBody({ type: RegisterUserDto, required: true })
    @ApiCreatedResponse({
        type: RegisterResponse,
        description: 'succssful register operation',
    })
    @ApiException(() => BadRequestException, {
        description: 'invalid fields throw this exception',
    })
    @ApiException(() => NotAcceptableException, {
        description: 'if email exists throw this exception',
    })
    @ApiException(() => ForbiddenException, {
        description: 'if recently send verify code',
    })
    @ApiException(
        () =>
            new HttpException(
                'Can not send verification email.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            ),
        { description: 'if can not send verify email throw this' },
    )
    async register(
        @Body() registerUserDto: RegisterUserDto,
    ): Promise<RegisterResponse> {
        if (await this.userService.checkExistsEmail(registerUserDto)) {
            throw new NotAcceptableException([
                'this email was registered try another.',
            ]);
        }
        await this.userService.createNewUser(registerUserDto);
        this.mailService.sendVerifyEmail(registerUserDto.email);
        return new RegisterResponse();
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto, required: true })
    async login(@Body() loginUserDto: LoginUserDto) {
        if (await this.userService.checkExistsEmail(loginUserDto)) {
            return await this.userService.validatteUser(loginUserDto);
        } else {
            throw new NotAcceptableException([
                "this email wasn't in the database.",
            ]);
        }
    }

    @Get('verify/:token')
    @ApiParam({
        type: String,
        name: 'token',
        required: true,
        example: 'f9519380-134a-41d1-be8a-d686b5a0ff48',
    })
    async verify(@Param('token', ParseUUIDPipe) token: string) {
        const r = await this.userService.verifyUser(token);
        if (r) {
            return { message: 'user verfied successful' };
        }
        return { message: 'faild to verified user' };
    }
}
