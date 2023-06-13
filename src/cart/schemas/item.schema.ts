import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    //@Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
    //productId: string;

    @Prop()
    postid: string;

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    price: number;

    @Prop()
    subTotalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
