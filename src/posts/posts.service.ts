import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument, Postt } from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Postt.name)
        private readonly postModel: Model<PostDocument>,
    ) {}

    async findOne(id: string) {
        const p = await this.postModel.findOne({ postid: id });
        return p;
    }

    async findAllByUsername(username: string) {
        return await this.postModel.find({ username });
    }

    async createSample() {
        const nm = await this.postModel.create({ caption: 'fuuuuuuuck' });
        await nm.save();
    }
}
