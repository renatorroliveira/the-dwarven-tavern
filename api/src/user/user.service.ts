import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from '@src/dto/UserDto';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(userToCreate: Omit<UserDto, 'userId'>, password: string) {
        const toBeCreated = new this.userModel(userToCreate);
        toBeCreated.password = password;
        return await toBeCreated.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async retrieveByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }
}
