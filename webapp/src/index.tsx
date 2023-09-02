import '@cloudscape-design/global-styles/index.css';

import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { queryClient } from './service/QueryClient';

import Alert from '@cloudscape-design/components/alert';
import Button from '@cloudscape-design/components/button';
import ContentLayout from '@cloudscape-design/components/content-layout';
import { applyTheme, Theme } from '@cloudscape-design/components/theming';
import { applyDensity, applyMode, Density, Mode } from '@cloudscape-design/global-styles';

const theme: Theme = {
    tokens: {
        fontFamilyBase: "Roboto,'Helvetica Neue', Arial, sans-serif",
        colorBackgroundLayoutMain: {
            dark: '#101217',
            light: '#d9dbe0',
        },
    },
};
applyTheme({ theme });
applyDensity(Density.Comfortable);
applyMode(Mode.Dark);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary
                        onReset={reset}
                        fallbackRender={({ resetErrorBoundary }) => (
                            <ContentLayout>
                                <Alert
                                    dismissible={false}
                                    type="error"
                                    onButtonClick={() => resetErrorBoundary()}
                                    action={<Button variant="primary">Try again</Button>}
                                    header="An unexpected error occurred."
                                >
                                    An API call returned with an unexpected error, please try again or return later.
                                </Alert>
                            </ContentLayout>
                        )}
                    >
                        <App />
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
