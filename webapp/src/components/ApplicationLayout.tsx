import { Outlet, useLocation } from 'react-router-dom';

import AppLayout, { AppLayoutProps } from '@cloudscape-design/components/app-layout';

import TopNav from '@src/navigation/TopNav';
import { APP_ROUTES_CONTENT_TYPE, APP_ROUTES_MAX_WIDTH } from '@src/routes/constants';

export function ApplicationLayout() {
    const { pathname } = useLocation();
    const contentType = getPageContentType(pathname);
    console.log('Content type for', pathname, '=', contentType);

    return (
        <>
            <TopNav />
            <AppLayout
                content={<Outlet />}
                contentType={contentType}
                maxContentWidth={APP_ROUTES_MAX_WIDTH[pathname]}
            />
        </>
    );
}

function getPageContentType(pathname: string): AppLayoutProps.ContentType {
    if (APP_ROUTES_CONTENT_TYPE[pathname]) {
        return APP_ROUTES_CONTENT_TYPE[pathname];
    }

    return 'default';
}
