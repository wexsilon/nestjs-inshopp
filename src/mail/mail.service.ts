import { MailerService } from '@nestjs-modules/mailer';
import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
    EmailVerify,
    EmailVerifyDocument,
} from './schemas/email.verify.schema';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';

@Injectable()
export class MailService {
    constructor(
        @InjectModel(EmailVerify.name)
        private readonly emailVerifyModel: Model<EmailVerifyDocument>,
        private readonly mailerService: MailerService,
        private readonly config: ConfigService,
    ) {}

    async sendVerifyEmail(email: string) {
        let emailVerify = await this.emailVerifyModel.findOne({ email });
        if (
            emailVerify &&
            (new Date().getTime() - emailVerify.timestamp.getTime()) / 60000 <
                15
        ) {
            throw new ForbiddenException([
                'A confirmation email has recently been sent.',
            ]);
        } else {
            if (emailVerify) {
                emailVerify.emailToken = randomUUID();
                emailVerify.timestamp = new Date();
            } else {
                emailVerify = await this.emailVerifyModel.create({
                    email,
                    emailToken: randomUUID(),
                    timestamp: new Date(),
                });
            }
            await emailVerify.save();
            try {
                await this.mailerService.sendMail({
                    to: email,
                    subject: 'Verify Email',
                    template: 'verify-email',
                    date: new Date(),
                    context: {
                        url: `http://${this.config.get(
                            'SERVER_HOST',
                        )}:${this.config.get('SERVER_PORT')}/user/verify/${
                            emailVerify.emailToken
                        }`,
                    },
                });
            } catch (e) {
                throw new HttpException(
                    'Can not send verification email.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}
