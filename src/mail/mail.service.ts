import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly config: ConfigService,
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
