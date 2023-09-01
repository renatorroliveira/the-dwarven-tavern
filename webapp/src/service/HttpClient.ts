import { Axios } from 'axios';
import { getLoginInfo } from './LoginInfo';

// TODO Replace with dynamic endpoint configuration
const ENDPOINT = 'http://localhost:5000';

const HttpClient = new Axios({
    baseURL: ENDPOINT,
    timeout: 20000,
    timeoutErrorMessage: 'The request timed out in the client.',
});

export function getHttpClient(): Axios {
    const loginInfo = getLoginInfo();

    if (loginInfo) {
        HttpClient.defaults.headers = {
            ...HttpClient.defaults.headers,
            common: {
                ...HttpClient.defaults.headers?.common,
                Authorization: `Bearer ${loginInfo.token}`,
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
