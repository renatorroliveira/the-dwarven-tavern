import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ autoCreate: true, autoIndex: true })
export class User {
    @Prop({ required: true })
    displayName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: 'string' })
    avatar: string | undefined;
}

export const UserSchema = SchemaFactory.createForClass(User);
