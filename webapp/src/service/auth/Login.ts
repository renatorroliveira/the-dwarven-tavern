import { useMutation } from '@tanstack/react-query';
import * as jwt from 'jose';

import { getHttpClient } from '../HttpClient';
import { LOGIN_STATUS_CACHE_KEY } from './constants';
import { IDoLoginProps, ILoginTokenPayload } from './types';

const DO_LOGIN_MUTATION_KEY = ['do-login'];

export function useDoLogin() {
    return useMutation(DO_LOGIN_MUTATION_KEY, doLogin, {});
}

async function doLogin(props: IDoLoginProps): Promise<ILoginTokenPayload> {
    const httpClient = getHttpClient();

    const result = await httpClient.post('/auth/login', JSON.stringify(props), {
        responseType: 'json',
    });

    if (result.status >= 200 && result.status < 300) {
        const data = JSON.parse(result.data);
        const { access_token } = data;
        const payload = jwt.decodeJwt(access_token);
        const signInInfo = {
            token: access_token,
            payload,
        };
        localStorage.setItem(LOGIN_STATUS_CACHE_KEY, JSON.stringify(signInInfo));

        return signInInfo;
    }
    throw new Error('Login error', {
        cause: result.data,
    });
}
