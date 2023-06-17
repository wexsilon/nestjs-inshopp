import {
    Controller,
    Get,
    Param,
    UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/guards/jwtauth/jwt.auth.guard';
import { execSync } from 'child_process';
import { Postt } from './schemas/post.schema';
import { PostCollectSuccessful } from './dto/post-collect-successful.dto';

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
    @ApiOkResponse({type: Postt, description: 'get post by id'})
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
    @ApiOkResponse({ type: PostCollectSuccessful, description: 'collect posts from instagram page and save into database' })
    async collectPost(@Param('username') username: string) {
        const bf = execSync(`python scripts/collect.py "${username}"`);
        return new PostCollectSuccessful(bf.toString());
    }
}
