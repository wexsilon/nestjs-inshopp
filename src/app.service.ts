import { Injectable } from '@nestjs/common';
import { PostsService } from './posts/posts.service';

@Injectable()
export class AppService {
    constructor(private readonly postsService: PostsService) {}

    getHello(): string {
        return 'Hello My Friend.';
    }

    async findPostByUsername(username: string) {
        return await this.postsService.findAllByUsername(username);
    }
}
