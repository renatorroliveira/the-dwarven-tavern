import AppLayout from '@cloudscape-design/components/app-layout';
import { Outlet } from 'react-router-dom';

export const AppRoutes = {
    path: '/',
    element: <AppLayout content={<Outlet />} contentType="default" />,
    errorElement: <AppLayout content={<h3>Not found</h3>} contentType="default" />,
    children: [
        {
            path: '',
            element: <h1>Hello</h1>,
        },
        {
            path: 'test',
            element: <h2>Fonte fumada?</h2>,
        },
    ],
};
