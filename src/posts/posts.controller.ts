import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('p')
@ApiTags('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }
}
