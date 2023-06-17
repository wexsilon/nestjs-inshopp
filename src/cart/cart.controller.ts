import {
    Controller,
    Req,
    Post,
    Body,
    Param,
    UseGuards,
    NotFoundException,
    Delete,
    Get,
} from '@nestjs/common';
import { Request } from 'express';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: ItemDto, required: true })
    async addItemToCart(@Req() req, @Body() itemDto: ItemDto) {
        const userId = req.user.oid;
        const cart = await this.cartService.addItemToCart(userId, itemDto);
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getCart(@Req() req) {
        return await this.cartService.getCart(req.user.oid);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postid')
    @ApiParam({
        type: String,
        name: 'postid',
        required: true,
        example: 'Cs5d0V5oQCA',
    })
    async removeItemFromCart(@Req() req, @Param('postid') postid: string) {
        const userId = req.user.oid;
        const cart = await this.cartService.removeItemFromCart(userId, postid);
        if (!cart) throw new NotFoundException('Item does not exist');
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('clear')
    async deleteCart(@Req() req) {
        const cart = await this.cartService.deleteCart(req.user.oid);
        if (!cart) throw new NotFoundException('Cart does not exist');
        return cart;
    }
}
