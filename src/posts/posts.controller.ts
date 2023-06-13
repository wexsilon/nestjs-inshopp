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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';
import { execSync } from 'child_process';

@Controller('p')
@ApiTags('post')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({
        type: String,
        name: 'id',
        required: true,
        example: 'Cs5d0V5oQCA',
    })
    async findOne(@Param('id') id: string) {
        return await this.postsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('collect/:username')
    @ApiParam({
        type: String,
        name: 'username',
        required: true,
        example: 'tak_tshirt',
    })
    async collectPost(@Param('username') username: string) {
        const bf = execSync(`python scripts/collect.py "${username}"`);
        return { message: bf.toString() };
    }
}
