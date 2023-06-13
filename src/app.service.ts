import { Injectable } from '@nestjs/common';
import { PostsService } from './posts/posts.service';

@Injectable()
export class AppService {
    constructor(private readonly postsService: PostsService) {

    }

    getHello(): string {
        return 'Hello World!';
    }

    async findPostByUsername(username: string) {
        //console.log('|' + username + '|');
        return await this.postsService.findAllByUsername(username);
    }
}
