import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useFactory: async (
                config: ConfigService,
            ): Promise<MongooseModuleOptions> => {
                let userPass = '';
                if (
                    config.get<string>('DB_USER') &&
                    config.get<string>('DB_PASS')
                )
                    userPass = `${config.get<string>(
                        'DB_USER',
                    )}:${config.get<string>('DB_PASS')}@`;

                return {
                    uri: `mongodb://${config.get<string>(
                        'DB_HOST',
                    )}:${config.get<number>('DB_PORT')}/${config.get<string>(
                        'DB_NAME',
                    )}`,
                };
            },
            inject: [ConfigService],
        }),
        UserModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
