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
}

export default (): IAppConfiguration => ({
    environment: (process.env.NODE_ENV as AppEnvironment) || 'development',
    port: _.toSafeInteger(process.env.PORT) || 3000,
    database: {
        host: process.env.DATABASE_HOST || 'http://localhost:27017',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
});
