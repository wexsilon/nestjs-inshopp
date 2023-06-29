import { ApiProperty } from '@nestjs/swagger';
export class ItemDto {
    @ApiProperty({
        name: 'postid',
        required: true,
        nullable: false,
        example: 'Cs5d0V5oQCA',
    })
    postid: string;

    /*
    @ApiProperty({
        name: 'name',
        required: true,
        nullable: false,
        example: 'تیشرت سوپر لش نگین دار کد 551',
    })
    name: string;
    */

    @ApiProperty({
        name: 'quantity',
        required: true,
        nullable: false,
        example: 3,
    })
    quantity: number;

    /*
    @ApiProperty({
        name: 'price',
        required: true,
        nullable: false,
        example: 320000,
    })
    price: number;
    */
}
