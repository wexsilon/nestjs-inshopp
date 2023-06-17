import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/guards/jwtauth/jwt.auth.guard';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Postt } from './posts/schemas/post.schema';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @ApiOkResponse({ type: String, description: 'test route and return hello' })
    getHello() {
        return this.appService.getHello();
    }

    @Get(':username')
    @UseGuards(JwtAuthGuard)
    @ApiParam({
        type: String,
        name: 'username',
        required: true,
        example: 'tak_tshirt',
    })
    @ApiOkResponse({ type: Postt, description: 'return posts by username' })
    async getShop(@Param('username') username: string) {
        return await this.appService.findPostByUsername(username);
    }
}
