import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import configurationProvider from '@src/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { RequestLoggerMiddleware } from './middlewares/RequestLoggerMiddleware';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
            load: [configurationProvider],
        }),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                const logger = new Logger(`${MongooseModule.name}AsyncConfiguration`);
                const config: MongooseModuleFactoryOptions = {
                    uri: `mongodb://${configService.get<string>('database.username')}:${configService.get<string>(
                        'database.password',
                    )}@${configService.get<string>('database.host')}?directConnection=true&appName=tdt-api`,
                    dbName: 'tdt',
                    retryAttempts: 2,
                    autoCreate: true,
                    autoIndex: true,
                    maxPoolSize: 100,
                    minPoolSize: 5,
                    maxIdleTimeMS: 300000,
                };
                logger.log('Instantiating database connection with configuration:', config);

                return config;
            },
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
