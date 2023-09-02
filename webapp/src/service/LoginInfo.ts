import { LOGIN_STATUS_CACHE_KEY } from './auth/constants';
import { ILoginTokenPayload } from './types';

export function getLoginInfo(): ILoginTokenPayload | null {
    const currentSessionRaw = localStorage.getItem(LOGIN_STATUS_CACHE_KEY);
    if (!currentSessionRaw) {
        return null;
    }
    return JSON.parse(currentSessionRaw);
}
