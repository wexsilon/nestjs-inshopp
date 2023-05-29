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

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: EmailVerify.name, schema: EmailVerifySchema },
        ]),
        MailModule,
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
