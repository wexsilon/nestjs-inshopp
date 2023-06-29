import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, SchemaTypes } from 'mongoose';
import { Item } from './item.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @ApiProperty({ example: '6484b3c4b89c0cad0b88fa3d' })
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    userId: string;

    @ApiProperty({
        example: [
            {
                postid: 'Cs5d0V5oQCA',
                name: 'تیشرت سوپر لش نگین دار کد 551',
                quantity: 32,
                price: 320000,
                subTotalPrice: 10240000,
            },
        ],
        type: [Item],
    })
    @Prop()
    items: Item[];

    @ApiProperty({ example: 16000000 })
    @Prop()
    totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
