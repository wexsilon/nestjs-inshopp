import { Prop } from '@nestjs/mongoose';
import { Post } from 'src/posts/schemas/post.schema';

export class Shop {
    @Prop()
    posts: Post[];
}
