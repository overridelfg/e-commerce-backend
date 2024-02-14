import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthDto } from "./auth.dto";
import { User } from "src/mongo/user.schema";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";
import { IUser } from "src/user/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string){
      const user = await this.userService.findUser(email);
      const passwordIsMatch = await argon2.verify(user.password, password);

      if(user && passwordIsMatch) {
        return user;
      }

      throw new UnauthorizedException("User or password are incorrect");
  }

  async login(email: string) {
    const user = await this.userService.findUser(email);
    return {
      user: {
        email: user.email,
        _id: user._id,
      },
      tokens: {
          accessToken: this.jwtService.sign({email, id: user._id}),
      }
    };
  }

  async register(email: string, name: string, password: string) {
    const user = await this.userService.createUser(email, name, password);
    if(user) {
      return {
        user: {
          email: user.email,
          name: user.name,
          _id: user._id
        },
        tokens: {
          accessToken: this.jwtService.sign({email, id: user._id, name: user.name})
        }
      }
    }
    return user;
  }
}