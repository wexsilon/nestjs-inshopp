import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterUserDto } from './dtos/register-user.dto';
import { IEmail } from './dtos/email.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
        u = await u.save();
        return u;
    }
}
