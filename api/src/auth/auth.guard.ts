import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_OPERATION_KEY } from '@src/decorators/PublicOperation';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_OPERATION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const request = context.switchToHttp().getRequest();
        const logger = new Logger(`${request.requestId}.AuthGuard`);

        if (isPublic) {
            logger.debug('Public endpoint, allowed.', context.getHandler(), context.getClass());
            return true;
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            logger.debug('No authorization token found, denied.');
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('auth.jwtSecret'),
            });

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['authContext'] = payload;
            logger.debug('Successfully decoded token, allowed.');
        } catch (e) {
            logger.debug('Failure decoding the token, denied.', e);
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
