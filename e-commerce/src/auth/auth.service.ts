import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthDto } from "./auth.dto";
import argon2 from "argon2";
import { User } from "src/mongo/user.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwt: JwtService
  ){}

  async register(dto: AuthDto) {
    const existingUser = await this.userModel.findOne({ email: dto.email });

    if(existingUser) {
        throw new BadRequestException("User already exists");
    }

    this.userModel.create({
        email: dto.email,
        password: await argon2.hash(dto.password)
    });
  }
}