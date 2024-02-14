import { BadRequestException, Injectable } from '@nestjs/common';
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
        try{
            const user = await this.userModel.findOne({ email });
            if(!user) {
                throw new BadRequestException("User not found!");
            }

            return user;
        }catch(error) {
            throw new BadRequestException(error);
        }
    }

    async createUser(email: string, name: string, password: string) {

        try{
            const isUserExists = await this.userModel.findOne({ email });
            if(isUserExists) {
                throw new BadRequestException("User already exists");
            }

            const hashedPassword = await argon2.hash(password);
            const newUser = {email, name, password: hashedPassword};
            
            const user = await this.userModel.create(newUser);
    
            return user;
        }catch(error) {
            throw new BadRequestException(error);
        }

    }
}
