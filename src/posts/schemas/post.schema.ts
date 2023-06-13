import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Postt {
    @Prop()
    postid: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    caption: string;

    @Prop()
    username: string;

    @Prop()
    img: string;
}

export type PostDocument = Postt & Document;
export const PostSchema = SchemaFactory.createForClass(Postt);
