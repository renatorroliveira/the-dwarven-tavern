import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '../HttpClient';
import { LOGIN_STATUS_CACHE_KEY } from './constants';
import { ILoginStatus } from './types';

export function useLonginStatus() {
    return useQuery<ILoginStatus | null>([LOGIN_STATUS_CACHE_KEY], getLoginStatus, {
        refetchInterval: 1800000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}

async function getLoginStatus(): Promise<ILoginStatus | null> {
    const currentInfo = localStorage.getItem(LOGIN_STATUS_CACHE_KEY);
    if (!currentInfo) {
        return null;
    }

    const httpClient = getHttpClient();

    const result = await httpClient.get('/login');

    if (result.status === 200) {
        return JSON.parse(result.data);
    }

    localStorage.removeItem(LOGIN_STATUS_CACHE_KEY);
    return null;
}
