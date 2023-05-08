import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Post('signup')
    signUp() {

    }

    @Post('signin')
    signIn() {
        
    }

}
