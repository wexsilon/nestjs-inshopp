export class LoginUserSuccessfulDto {
    constructor(
        public message: string,
        public token: string,
        public userId: string,
    ) {}
}
