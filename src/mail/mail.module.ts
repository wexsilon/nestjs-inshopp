import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (
                config: ConfigService,
            ): Promise<MailerOptions> => {
                return {
                    transport: {
                        host: config.get<string>('EMAIL_HOST'),
                        port: config.get<number>('EMAIL_PORT'),
                        auth: {
                            user: config.get<string>('EMAIL_USER'),
                            pass: config.get<string>('EMAIL_PASS'),
                        },
                        secure: false,
                        socketTimeout: 120000,
                    },
                    defaults: {
                        from: `"No Reply" <${config.get<string>(
                            'EMAIL_USER',
                        )}>`,
                    },
                    template: {
                        adapter: new EjsAdapter(),
                        dir: join(__dirname, '..', '..', '..', 'views', 'mail'),
                        options: {},
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
