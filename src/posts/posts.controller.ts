import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';
import { execSync } from 'child_process';

@Controller('p')
@ApiTags('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.postsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('collect/:username')
    async collectPost(@Param('username') username: string) {
        const bf = execSync(`python scripts/collect.py "${username}"`);
        return { message: bf.toString() };
    }
}
