import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: true,
        logger: ['debug', 'verbose', 'log', 'error', 'fatal', 'warn'],
        rawBody: true,
    });

    app.enableCors({});
    app.useGlobalPipes(
        new ValidationPipe({
            errorHttpStatusCode: 400,
        }),
    );

    await app.listen(5000);
}
bootstrap();
