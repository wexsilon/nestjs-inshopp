import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema, Cart } from './schemas/cart.schema';
import { PostsModule } from 'src/posts/posts.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
        PostsModule,
    ],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {}
