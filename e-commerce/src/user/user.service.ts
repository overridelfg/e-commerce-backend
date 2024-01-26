import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from "argon2";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email });
        console.log(user)
        return user;
    }

    async createUser(email: string, password: string) {
        const hashedPassword = await argon2.hash(password);
        console.log(hashedPassword)
        const newUser = {email, password: hashedPassword}
        const user = await this.userModel.create(newUser);
        console.log(user, 'lol')
        return user;
    }

}
