import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const configService = app.get(ConfigService);

    app.disable('x-powered-by');

    const documentBuilder = new DocumentBuilder()
        .setTitle('InShopP Api')
        .setDescription('The InShopP API description')
        .setVersion('1.0')
        .addTag('InShopP')
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('api', app, document);

    await app.listen(
        configService.get<number>('SERVER_PORT'),
        configService.get<string>('SERVER_HOST'),
        () => {
            console.log(
                `Start Server On http://${configService.get<string>(
                    'SERVER_HOST',
                )}:${configService.get<number>('SERVER_PORT')}/`,
            );
        },
    );
}
bootstrap();
