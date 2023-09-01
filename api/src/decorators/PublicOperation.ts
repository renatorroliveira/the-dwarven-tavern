import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_OPERATION_KEY = 'isPublicOperation';
export const PublicOperation = () => SetMetadata(IS_PUBLIC_OPERATION_KEY, true);
