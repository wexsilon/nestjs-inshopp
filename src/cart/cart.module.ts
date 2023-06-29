import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema, Cart } from './schemas/cart.schema';
import { PostsModule } from 'src/posts/posts.module';
import { Postt, PostSchema } from 'src/posts/schemas/post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Cart.name, schema: CartSchema },
            { name: Postt.name, schema: PostSchema },
        ]),
        PostsModule,
    ],
    providers: [CartService],
    controllers: [CartController],
})
export class CartModule {}
