import AppLayout from '@cloudscape-design/components/app-layout';

import { APP_ROUTES_FOR_PAGES } from './constants';

import { ApplicationLayout } from '@src/components/ApplicationLayout';
import { HomePage } from './HomePage';
import { SigninPage } from './auth/Signin';
import { SignupPage } from './auth/SignupPage';

export const useAppRoutes = () => {
    return {
        path: '/',
        element: <ApplicationLayout />,
        errorElement: <AppLayout content={<h3>Not found</h3>} contentType="default" />,
        children: [
            {
                path: toRelativeRoute(APP_ROUTES_FOR_PAGES.HOME),
                element: <HomePage />,
            },
            {
                path: toRelativeRoute(APP_ROUTES_FOR_PAGES.SIGNIN),
                element: <SigninPage />,
            },
            {
                path: toRelativeRoute(APP_ROUTES_FOR_PAGES.SIGNUP),
                element: <SignupPage />,
            },
            {
                path: 'test',
                element: <h2>Fonte fumada?</h2>,
            },
        ],
    };
};

function toRelativeRoute(fullRoute: string) {
    return fullRoute.substring(1);
}
