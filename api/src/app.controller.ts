import { Controller, Get, Logger, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@src/app.service';
import { AuthGuard } from './auth/auth.guard';
import { PublicOperation } from './decorators/PublicOperation';
import { UserDto } from './dto/UserDto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    @PublicOperation()
    @Get('/')
    async healthCheck() {
        await this.appService.deepHealthCheck();
        const healthCheckResult = { healthy: true, environment: this.configService.get<string>('environment') };
        this.logger.log(`Health check called: ${JSON.stringify(healthCheckResult)}`);
        return healthCheckResult;
    }

    @UseGuards(AuthGuard)
    @Get('/login')
    async loginStatus(@Req() request: any) {
        const { authContext } = request;
        const userEmail = authContext.username;
        const user = await this.userService.retrieveByEmail(userEmail);
        if (!user) {
            throw new NotFoundException();
        }

        return new UserDto(user);
    }
}
