import { User } from '@src/user/user.model';
import { Types } from 'mongoose';

export class UserDto {
    constructor(
        user: User & {
            _id: Types.ObjectId;
        },
    ) {
        this.userId = user._id;
        this.email = user.email;
        this.displayName = user.displayName;
        this.avatar = user.avatar;
    }

    userId: Types.ObjectId;
    email: string;
    displayName: string;
    avatar?: string | undefined;
}
