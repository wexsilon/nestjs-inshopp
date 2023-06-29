import { ApiProperty } from '@nestjs/swagger';

export class LoginUserSuccessfulDto {
    @ApiProperty({ example: 'succssful login' })
    public message: string;
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndleHNpbG9uMjAwMUBwcm90b25tYWlsLmNvbSIsInVzZXJJZCI6IjY0ODRiM2M0Yjg5YzBjYWQwYjg4ZmEzZCIsImlhdCI6MTY4ODA2NjcwN30.P9tGI8bweANsguE3Te29Vsz0p0eWNDBBHlFhwwOb7CQ',
    })
    public token: string;
    @ApiProperty({ example: '6484b3c4b89c0cad0b88fa3d' })
    public userId: string;
    @ApiProperty({ example: 'behzadghat' })
    public username: string;

    constructor(
        message: string,
        token: string,
        userId: string,
        username: string,
    ) {
        this.message = message;
        this.token = token;
        this.userId = userId;
        this.username = username;
    }
}
