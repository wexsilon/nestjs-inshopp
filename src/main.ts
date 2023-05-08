import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);

    app.disable('x-powered-by');

    await app.listen(
        configService.get<number>('SERVER_PORT'),
        configService.get<string>('SERVER_HOST'),
        () => {
            console.log(`Start Server On http://${configService.get<string>('SERVER_HOST')}:${configService.get<number>('SERVER_PORT')}/`);
        }
    );
}
bootstrap();
