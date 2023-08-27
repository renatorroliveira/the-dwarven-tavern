import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppRoutes } from './Routes';

export function ApplicationRoutes() {
    const router = createBrowserRouter([AppRoutes]);

    return <RouterProvider router={router} />;
}
