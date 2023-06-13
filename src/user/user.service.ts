import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import argon2 from 'argon2';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/register-user.dto';
import { IEmail } from './dtos/email.interface';
import {
    EmailVerify,
    EmailVerifyDocument,
} from 'src/mail/schemas/email.verify.schema';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
        @InjectModel(EmailVerify.name)
        private readonly emailVerifyModel: Model<EmailVerifyDocument>,
        private jwtService: JwtService,
    ) {}

    public async checkExistsEmail(
        objEmail: IEmail,
    ): Promise<UserDocument | null> {
        const u = await this.userModel.findOne({ email: objEmail.email });
        return u;
    }

    public async createNewUser(
        registerUserDto: RegisterUserDto,
    ): Promise<UserDocument | null> {
        let u = await this.userModel.create(registerUserDto);
        u.password = await argon2.hash(u.password);
        u = await u.save();
        return u;
    }

    public async verifyUser(token: string): Promise<Boolean> {
        const emailVerify = await this.emailVerifyModel.findOne({
            emailToken: token,
        });
        const user = await this.userModel.findOneAndUpdate(
            { email: emailVerify.email },
            { verified: true },
        );
        await user.save();
        await emailVerify.deleteOne();
        return true;
    }

    public async validatteUser(loginUserDto: LoginUserDto) {
        const user = await this.userModel.findOne({
            email: loginUserDto.email,
        });
        if (user) {
            if (await argon2.verify(user.password, loginUserDto.password)) {
                const accessToken = this.jwtService.sign({
                    email: user.email,
                    userId: user._id,
                });
                return { message: 'succssful login', token: accessToken, userId: user._id };
            } else {
                return { message: 'invalid password' };
            }
        } else {
            return { message: 'Not found user' };
        }
    }
}
