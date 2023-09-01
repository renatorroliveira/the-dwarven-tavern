import { queryClient } from './QueryClient';
import { LOGIN_STATUS_CACHE_KEY } from './auth/constants';
import { ILoginStatus } from './types';

export function getLoginInfo(): ILoginStatus | undefined {
    const data = queryClient.getQueryData<ILoginStatus>([LOGIN_STATUS_CACHE_KEY]);

    return data;
}
