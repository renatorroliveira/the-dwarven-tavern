import { useQuery } from '@tanstack/react-query';
import { getHttpClient } from '../HttpClient';
import { LOGIN_STATUS_CACHE_KEY } from './constants';
import { ILoginStatus } from './types';

export function useLonginStatus() {
    const currentInfo = localStorage.getItem(LOGIN_STATUS_CACHE_KEY);

    return useQuery<ILoginStatus | null>([LOGIN_STATUS_CACHE_KEY], getLoginStatus, {
        initialData: currentInfo ? JSON.parse(currentInfo) : null,
        refetchInterval: 900000,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!currentInfo,
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
        localStorage.setItem(LOGIN_STATUS_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
    }

    localStorage.removeItem(LOGIN_STATUS_CACHE_KEY);
    return null;
}
