import { JWTPayload } from 'jose';
export interface ILoginStatus {
    userId: string;
    email: string;
    displayName: string;
    token: string;
}

export interface IDoLoginProps {
    email: string;
    password: string;
}

export interface ILoginTokenPayload {
    token: string;
    payload: JWTPayload;
}
