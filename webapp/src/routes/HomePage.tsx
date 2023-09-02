import { PageHTMLTitle } from '@src/components/PageHTMLTitle';

import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export function HomePage() {
    return (
        <>
            <PageHTMLTitle title="Home" />
            <ContentLayout
                header={
                    <Header
                        variant="awsui-h1-sticky"
                        description="Grab a mug of beer, a hammer, a chair and get together in this exciting community"
                    >
                        Welcome to The Dwarven Tavern community!
                    </Header>
                }
            >
                <SpaceBetween size="l" direction="vertical">
                    <Container header={<Header variant="h2">Your summary</Header>}>
                        <Box textAlign="center" variant="p" fontSize="body-s" color="text-body-secondary">
                            Nothing to show yet.
                        </Box>
                    </Container>
                </SpaceBetween>
            </ContentLayout>
        </>
    );
}
