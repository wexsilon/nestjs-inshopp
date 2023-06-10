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
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Role } from 'src/auth/enums/role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ItemDto } from './dto/item.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.User)
    @Post()
    async addItemToCart(@Req() req, @Body() itemDto: ItemDto) {
        const userId = req.user.userId;
        const cart = await this.cartService.addItemToCart(userId, itemDto);
        return cart;
    }

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.User)
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

    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.User)
    @Delete(':id')
    async deleteCart(@Param('id') userId: string) {
        const cart = await this.cartService.deleteCart(userId);
        if (!cart) throw new NotFoundException('Cart does not exist');
        return cart;
    }
}
