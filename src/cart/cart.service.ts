import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ItemDto } from './dto/item.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    ) {}

    async createCart(
        userId: string,
        itemDto: ItemDto,
        subTotalPrice: number,
        totalPrice: number,
    ): Promise<Cart> {
        const newCart = await this.cartModel.create({
            userId,
            items: [{ ...itemDto, subTotalPrice }],
            totalPrice,
        });
        return newCart;
    }

    async getCart(userId: string): Promise<CartDocument> {
        return await this.cartModel.findOne({ userId });
    }

    async deleteCart(userId: string): Promise<Cart> {
        const deletedCart = await this.cartModel.findOneAndDelete({ userId });
        return deletedCart;
    }

    private reCalculateCart(cart: CartDocument) {
        cart.totalPrice = 0;
        cart.items.forEach((item) => {
            cart.totalPrice += item.price * item.quantity;
        });
    }

    async addItemToCart(userId: string, itemDto: ItemDto) {
        const { productId, quantity, price } = itemDto;
        const subTotalPrice = quantity * price;

        const cart = await this.getCart(userId);

        if (cart) {
            const itemIndex = cart.items.findIndex((item) => {
                item.productId == productId;
            });
            if (itemIndex >= 0) {
                const item = cart.items[itemIndex];
                item.quantity = Number(item.quantity) + Number(quantity);
                item.subTotalPrice = item.quantity * item.price;
                cart.items[itemIndex] = item;
            } else {
                cart.items.push({ ...itemDto, subTotalPrice });
            }

            this.reCalculateCart(cart);
            return cart.save();
        } else {
            const newCart = await this.createCart(
                userId,
                itemDto,
                subTotalPrice,
                price,
            );
            return newCart;
        }
    }

    async removeItemFromCart(userId: string, productId: string): Promise<any> {
        const cart = await this.getCart(userId);
        const itemIndex = cart.items.findIndex(
            (item) => item.productId == productId,
        );

        if (itemIndex >= 0) {
            cart.items.splice(itemIndex, 1);
            this.reCalculateCart(cart);
            return await cart.save();
        }
    }
}
