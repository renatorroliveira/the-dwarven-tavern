import { ApplicationRoutes } from './navigation/ApplicationRoutes';
import Box from '@cloudscape-design/components/box';
import TopNav from './navigation/TopNav';

function App() {
    return (
        <Box variant="div">
            <TopNav />
            <ApplicationRoutes />
        </Box>
    );
}

export default App;
