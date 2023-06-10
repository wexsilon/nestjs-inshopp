import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    ) {}

    async findOne(id: string) {
        const p = await this.postModel.findOne({ postid: id });
        return p;
    }
}
