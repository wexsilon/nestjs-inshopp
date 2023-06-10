import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/guards/jwtauth/jwt.auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get(':username')
    async getShop(@Param('username') username: string) {}
}
