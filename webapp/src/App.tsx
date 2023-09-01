import { useEffect } from 'react';

import { ApplicationRoutes } from '@src/navigation/ApplicationRoutes';
import { useAppStatus } from '@src/service/operations';

function App() {
    const appStatus = useAppStatus();

    useEffect(() => {
        if (!appStatus.isLoading) {
            if (appStatus.error) {
                console.error('API health check failed:', appStatus.error);
            } else {
                console.log(`API health check:`, appStatus.data);
            }
        }
    }, [appStatus.data]);

    return <ApplicationRoutes />;
}

export default App;
