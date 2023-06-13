import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/guards/jwtauth/jwt.auth.guard';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
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
    async getShop(@Param('username') username: string) {
        console.log(username);
        return await this.appService.findPostByUsername(username);
    }
}
