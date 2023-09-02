import { useEffect } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ApplicationRoutes } from '@src/routes/ApplicationRoutes';
import { useAppStatus, useLonginStatus } from '@src/service/operations';

function App() {
    const appStatus = useAppStatus();
    const loginStatus = useLonginStatus();

    useEffect(() => {
        if (!appStatus.isLoading) {
            if (appStatus.error) {
                console.error('API health check failed:', appStatus.error);
            } else {
                console.log(`API health check:`, appStatus.data);
            }
        }
    }, [appStatus.data]);

    if (appStatus.isLoading || loginStatus.isLoading) {
        // TODO swap for a splash screen
        return (
            <AppLayout
                maxContentWidth={300}
                content={
                    <SpaceBetween direction="horizontal" alignItems="center" size="xxl">
                        <Icon size="big" name="status-in-progress" />
                    </SpaceBetween>
                }
            />
        );
    }

    return <ApplicationRoutes />;
}

export default App;
