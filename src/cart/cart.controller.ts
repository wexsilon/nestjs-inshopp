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
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';
import { Cart } from './schemas/cart.schema';

@Controller('cart')
@ApiTags('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: ItemDto, required: true })
    @ApiCreatedResponse({
        type: Cart,
        description: 'add item to cart and return',
    })
    async addItemToCart(@Req() req, @Body() itemDto: ItemDto) {
        const userId = req.user.oid;
        const cart = await this.cartService.addItemToCart(userId, itemDto);
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Get('get')
    @ApiOkResponse({ type: Cart, description: 'get current user cart' })
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
    @ApiResponse({ type: Cart, description: 'delete product by id from cart' })
    async removeItemFromCart(@Req() req, @Param('postid') postid: string) {
        const userId = req.user.oid;
        const cart = await this.cartService.removeItemFromCart(userId, postid);
        if (!cart) throw new NotFoundException('Item does not exist');
        return cart;
    }

    @UseGuards(JwtAuthGuard)
    @Delete('clear')
    @ApiResponse({ type: Cart, description: 'delete entire cart' })
    async deleteCart(@Req() req) {
        const cart = await this.cartService.deleteCart(req.user.oid);
        if (!cart) throw new NotFoundException('Cart does not exist');
        return cart;
    }
}
