import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useAppRoutes } from '@src/routes';

export function ApplicationRoutes() {
    const AppRoutes = useAppRoutes();
    const router = createBrowserRouter([AppRoutes]);

    return <RouterProvider router={router} />;
}
