import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ type: SchemaTypes.String, required: true })
    username: string;

    @Prop({ type: SchemaTypes.String, required: true, unique: true })
    email: string;

    @Prop({ type: SchemaTypes.String, required: true })
    password: string;

    @Prop({ type: SchemaTypes.Boolean, default: false })
    verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
