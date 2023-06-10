import {
    Controller,
    Req,
    Post,
    Body,
    Param,
    UseGuards,
    NotFoundException,
    Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addItemToCart(@Req() req, @Body() itemDto: ItemDto) {
        const userId = req.user.userId;
        const cart = await this.cartService.addItemToCart(userId, itemDto);
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async removeItemFromCart(@Req() req, @Body('productId') productId: string) {
        const userId = req.user.userId;
        const cart = await this.cartService.removeItemFromCart(
            userId,
            productId,
        );
        if (!cart) throw new NotFoundException('Item does not exist');
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCart(@Param('id') userId: string) {
        const cart = await this.cartService.deleteCart(userId);
        if (!cart) throw new NotFoundException('Cart does not exist');
        return cart;
    }
}
