import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { MailModule } from 'src/mail/mail.module';
import {
    EmailVerify,
    EmailVerifySchema,
} from 'src/mail/schemas/email.verify.schema';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/jwtauth/jwt.auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: EmailVerify.name, schema: EmailVerifySchema },
        ]),
        MailModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [UserService, JwtStrategy, JwtAuthGuard],
    controllers: [UserController],
    exports: [JwtAuthGuard],
})
export class UserModule {}
