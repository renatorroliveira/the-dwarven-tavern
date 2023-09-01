import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '../HttpClient';
import { IAppStatus } from './types';

const BASE_QUERY_KEY = ['app-status'];

export function useAppStatus() {
    return useQuery(BASE_QUERY_KEY, getAppStatus, {
        refetchInterval: 300000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

async function getAppStatus(): Promise<IAppStatus> {
    const httpClient = getHttpClient();

    const result = await httpClient.get('/');

    return result.data;
}
