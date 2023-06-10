import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './user/guards/jwtauth/jwt.auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':username')
    @UseGuards(JwtAuthGuard)
    async getShop(@Param('username') username: string) {}
}
