import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { EmailVerify, EmailVerifyDocument } from './schemas/email.verify.schema';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly config: ConfigService,
        @InjectModel(EmailVerify.name) private readonly emailVerifyModel: Model<EmailVerifyDocument>
    ) {}

    async sendVerifyEmail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Verify Email',
            template: 'verify-email',
            date: new Date(),
            context: {
                url: `http://${this.config.get(
                    'SERVER_HOST',
                )}:${this.config.get('SERVER_PORT')}/auth/verify/${
                    '' //emailVerify.emailToken
                }`,
            },
        });
    }
}
