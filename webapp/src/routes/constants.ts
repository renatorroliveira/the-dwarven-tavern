import { AppLayoutProps } from '@cloudscape-design/components/app-layout';

export const APP_ROUTES_FOR_PAGES = {
    HOME: '/',
    SIGNIN: '/signin',
    SIGNUP: '/signup',
};

export const APP_ROUTES_CONTENT_TYPE: { [key: string]: AppLayoutProps.ContentType } = {
    [APP_ROUTES_FOR_PAGES.HOME]: 'default',
    [APP_ROUTES_FOR_PAGES.SIGNIN]: 'form',
    [APP_ROUTES_FOR_PAGES.SIGNUP]: 'form',
};

export const APP_ROUTES_MAX_WIDTH: { [key: string]: number | undefined } = {
    [APP_ROUTES_FOR_PAGES.HOME]: undefined,
    [APP_ROUTES_FOR_PAGES.SIGNIN]: 600,
    [APP_ROUTES_FOR_PAGES.SIGNUP]: 600,
};
