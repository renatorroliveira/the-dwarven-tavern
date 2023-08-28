import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async deepHealthCheck() {
        return 'Healthy';
    }
}
