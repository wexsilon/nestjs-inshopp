import { Prop } from '@nestjs/mongoose';
import { Postt } from 'src/posts/schemas/post.schema';

export class Shop {
    @Prop()
    posts: Postt[];
}
