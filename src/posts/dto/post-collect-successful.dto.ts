import { ApiProperty } from '@nestjs/swagger';

export class PostCollectSuccessful {
    @ApiProperty({ example: 'ok' })
    public message: string;
    constructor(message: string) {
        this.message = message;
    }
}
