import { IResponse } from 'src/common/responses/response.interface';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterResponse implements IResponse {
    @ApiProperty({
        name: 'statusCode',
        description: 'http status code',
        example: 201,
    })
    statusCode: number = 201;

    @ApiProperty({
        name: 'message',
        description: 'output message',
        example: ['register succssful, send verify code to your email.'],
    })
    message: string[] = ['register succssful, send verify code to your email.'];

    @ApiProperty({
        name: 'error',
        description: 'if something is wrong this is not empty',
        example: '',
    })
    error: string = '';
}
