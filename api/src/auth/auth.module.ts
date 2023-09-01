import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { UserModule } from '@src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const JWT_MODULE = JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => {
        const config: JwtModuleOptions = {
            global: true,
            secret: configService.get<string>('auth.jwtSecret'),
            signOptions: { expiresIn: '12h', issuer: '@tdt/api' },
        };

        return config;
    },
    inject: [ConfigService],
});
@Module({
    imports: [UserModule, JWT_MODULE],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard],
    exports: [AuthService, AuthGuard, JWT_MODULE],
})
export class AuthModule {}
