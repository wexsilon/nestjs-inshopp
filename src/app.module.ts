import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useFactory: async (
                config: ConfigService,
            ): Promise<MongooseModuleOptions> => {
                let userPass = '';
                if (config.get('DB_USER') && config.get('DB_PASS'))
                    userPass = `${config.get('DB_USER')}:${config.get(
                        'DB_PASS',
                    )}@`;

                return {
                    uri: `mongodb://${config.get('DB_HOST')}:${config.get(
                        'DB_PORT',
                    )}/${config.get('DB_NAME')}`,
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
