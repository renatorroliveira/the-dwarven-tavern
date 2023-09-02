import { useCallback, useEffect, useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { PageHTMLTitle } from '@src/components/PageHTMLTitle';
import { useDoLogin, useLonginStatus } from '@src/service/operations';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES_FOR_PAGES } from '../constants';

interface ILoginForm {
    email: string;
    password: string;
}

export function SigninPage() {
    const navigate = useNavigate();
    const doLogin = useDoLogin();
    const loginStatus = useLonginStatus();
    const [formData, setFormData] = useState<ILoginForm>({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (loginStatus.data) {
            navigate(APP_ROUTES_FOR_PAGES.HOME);
        }
    }, [loginStatus.data]);

    const onEmailChange = useInputFieldOnChange('email', formData, setFormData);
    const onPasswordChange = useInputFieldOnChange('password', formData, setFormData);

    const onSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
        async (event) => {
            event.preventDefault();
            console.log('Submitting sign in', formData);
            console.log(await doLogin.mutateAsync(formData));
            await loginStatus.refetch();
            navigate(APP_ROUTES_FOR_PAGES.HOME);
        },
        [formData, doLogin.mutate, loginStatus.refetch],
    );

    return (
        <>
            <PageHTMLTitle title="Sign-in" />
            <form onSubmit={onSubmit}>
                <Form
                    variant="full-page"
                    actions={
                        <SpaceBetween direction="horizontal" size="xs">
                            <Button variant="primary">Login</Button>
                        </SpaceBetween>
                    }
                    header={<Header variant="h1">Sign in</Header>}
                >
                    <Container
                        footer={
                            <SpaceBetween size="xs" direction="vertical">
                                <Link fontSize="body-s">Forgot your password? Request a password reset.</Link>
                                <Link fontSize="body-s">Don't have an account yet? Sign-up.</Link>
                            </SpaceBetween>
                        }
                    >
                        <SpaceBetween direction="vertical" size="l">
                            <FormField label="Email">
                                <Input type="email" value={formData.email} name="email" onChange={onEmailChange} />
                            </FormField>
                            <FormField label="Password">
                                <Input
                                    type="password"
                                    value={formData.password}
                                    name="password"
                                    onChange={onPasswordChange}
                                />
                            </FormField>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
        </>
    );
}

function useInputFieldOnChange<TFormData = ILoginForm>(
    name: keyof TFormData,
    formData: TFormData,
    setFormData: React.Dispatch<TFormData>,
): NonCancelableEventHandler<{ value: string }> {
    return useCallback<NonCancelableEventHandler<{ value: string }>>(
        (event) => {
            setFormData({
                ...formData,
                [name]: event.detail.value,
            });
        },
        [formData, setFormData],
    );
}
