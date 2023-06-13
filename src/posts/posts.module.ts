import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Postt} from './schemas/post.schema';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Postt.name, schema: PostSchema }]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {}
