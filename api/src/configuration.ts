import _ from 'lodash';

export type AppEnvironment = 'production' | 'test' | 'development';
export interface IAppConfiguration {
    environment: AppEnvironment;
    port: number;
    database: {
        host: string;
        username?: string;
        password?: string;
    };
    auth: {
        jwtSecret: string;
        passowrdSaltRounds: number;
    };
}

export default (): IAppConfiguration => ({
    environment: (process.env.NODE_ENV as AppEnvironment) || 'development',
    port: _.toSafeInteger(process.env.PORT) || 3000,
    database: {
        host: process.env.DATABASE_HOST || 'http://localhost:27017',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
    auth: {
        jwtSecret: process.env.AUTH_JWT_SECRET || 'THIS_FAILED_TO_LOAD_OH_NO_CATCH22',
        passowrdSaltRounds: process.env.AUTH_PWD_SALT_ROUNDS ? parseInt(process.env.AUTH_PWD_SALT_ROUNDS) : 400,
    },
});
