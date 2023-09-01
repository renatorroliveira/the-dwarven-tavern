import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(input: unknown): Promise<User> {
        const createdCat = new this.userModel(input);
        return createdCat.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async retrieveByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}
