import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type EmailVerifyDocument = EmailVerify & Document;

@Schema()
export class EmailVerify {
    @Prop({ type: SchemaTypes.String })
    email: string;

    @Prop({ type: SchemaTypes.String })
    emailToken: string;

    @Prop({ type: SchemaTypes.Date })
    timestamp: Date;
}

export const EmailVerifySchema = SchemaFactory.createForClass(EmailVerify);
