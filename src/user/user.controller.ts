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
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UserService } from './user.service';
import { MailService } from 'src/mail/mail.service';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly mailService: MailService,
    ) {}

    @Post('register')
    @ApiBody({ type: RegisterUserDto, required: true })
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
    async register(@Body() registerUserDto: RegisterUserDto) {
        if (await this.userService.checkExistsEmail(registerUserDto)) {
            throw new NotAcceptableException([
                'this email was registered try another.',
            ]);
        }
        await this.userService.createNewUser(registerUserDto);
        this.mailService.sendVerifyEmail(registerUserDto.email);
        return {
            message: 'Ok',
        };
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto, required: true })
    async login(@Body() loginUserDto: LoginUserDto) {
        if (await this.userService.checkExistsEmail(loginUserDto)) {
        } else {
            throw new NotAcceptableException([
                "this email wasn't in the database.",
            ]);
        }
    }

    @Get('verify/:token')
    async verify(@Param('token', ParseUUIDPipe) token: string) {}
}
