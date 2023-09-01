import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { PageHTMLTitle } from '@src/components/PageHTMLTitle';
import { useCallback, useState } from 'react';

interface ILoginForm {
    email: string;
    password: string;
}

export function SigninPage() {
    const [formData, setFormData] = useState<ILoginForm>({
        email: '',
        password: '',
    });

    const onChange = useCallback(() => {}, [setFormData]);

    return (
        <>
            <PageHTMLTitle title="Sign-in" />
            <form onSubmit={(e) => e.preventDefault()}>
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
                                <Link fontSize="body-s">Forgort your password?</Link>
                                <Link fontSize="body-s">Not registered yet? Sign-up</Link>
                            </SpaceBetween>
                        }
                    >
                        <SpaceBetween direction="vertical" size="l">
                            <FormField label="Email">
                                <Input type="email" value={formData.email} name="email" onChange={onChange} />
                            </FormField>
                            <FormField label="Password">
                                <Input type="password" value={formData.password} name="password" onChange={onChange} />
                            </FormField>
                        </SpaceBetween>
                    </Container>
                </Form>
            </form>
        </>
    );
}
