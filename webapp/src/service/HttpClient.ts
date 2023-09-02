import { Axios } from 'axios';
import { getLoginInfo } from './LoginInfo';

// TODO Replace with dynamic endpoint configuration
const ENDPOINT = 'http://localhost:5000';

const HttpClient = new Axios({
    baseURL: ENDPOINT,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    },
    decompress: true,
    responseType: 'json',
    timeout: 20000,
    timeoutErrorMessage: 'The request timed out in the client.',
});

export function getHttpClient(): Axios {
    const currentSession = getLoginInfo();

    if (currentSession) {
        HttpClient.defaults.headers = {
            ...HttpClient.defaults.headers,
            common: {
                ...HttpClient.defaults.headers?.common,
                Authorization: `Bearer ${currentSession.token}`,
            },
        };
    } else {
        HttpClient.defaults.headers = {
            ...HttpClient.defaults.headers,
            common: {
                ...HttpClient.defaults.headers?.common,
                Authorization: null,
            },
        };
    }
    return HttpClient;
}
