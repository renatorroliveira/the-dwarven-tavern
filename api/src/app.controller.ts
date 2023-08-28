import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@src/app.service';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);
    constructor(
        private readonly appService: AppService,
        private readonly configService: ConfigService,
    ) {}

    @Get('/')
    async healthCheck() {
        await this.appService.deepHealthCheck();
        const healthCheckResult = { healthy: true, environment: this.configService.get<string>('environment') };
        this.logger.log(`Health check called: ${JSON.stringify(healthCheckResult)}`);
        return healthCheckResult;
    }
}
