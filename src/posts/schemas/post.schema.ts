import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
    @Prop()
    postid: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    caption: string;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
