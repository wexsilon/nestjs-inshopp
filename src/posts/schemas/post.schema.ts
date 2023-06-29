import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Postt {
    @ApiProperty({ example: 'Cs5d0V5oQCA' })
    @Prop()
    postid: string;

    @ApiProperty({ example: 'تیشرت سوپر لش نگین دار کد 551' })
    @Prop()
    name: string;

    @ApiProperty({ example: 320000 })
    @Prop()
    price: number;

    @ApiProperty({
        example:
            'تیشرت سوپر لش نگین دار کد 551\nسایز 3XL. 4XL \nپشت چاپ \n\n.................................................................\nقیمت 320.000 تومان \n.....................‌‌‌‌‌‌‌...........................................\n\nعرض شکم کمتر از عرض سینه هست\n\nسایز 3XL : عرض سینه از زیر بغل 62 سانت. قد از پشت یقه تا پایین کار 86 سانت. \n\nسایز 4XL : عرض سینه از زیر بغل 67 سانت. قد از پشت یقه تا پایین کار 90 سانت. \n\n.................................................................‌\n\n#تک_تیشرت #تیشرت_سفید_لش_استایل #تیشرت_جدید_گنگ_استایل #لش_لانگ_گنگ_بیگ_سایز #تیشرت_سوپر_لش_لانگ',
    })
    @Prop()
    caption: string;

    @ApiProperty({ example: 'tak_tshirt' })
    @Prop()
    username: string;

    @ApiProperty({
        example: '/public/img/posts/3114651748118298478_13688367255.jpg',
    })
    @Prop()
    img: string;
}

export type PostDocument = Postt & Document;
export const PostSchema = SchemaFactory.createForClass(Postt);
