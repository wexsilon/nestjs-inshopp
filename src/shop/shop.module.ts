import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
    controllers: [],
    providers: [ShopService],
})
export class ShopModule {}
