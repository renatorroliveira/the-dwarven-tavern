import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@src/app.controller';
import { AppModule } from '@src/app.module';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', async () => {
            expect(await appController.healthCheck()).toMatchObject({ healthy: true });
        });
    });
});
