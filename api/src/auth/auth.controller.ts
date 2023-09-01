import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';

import { PublicOperation } from '@src/decorators/PublicOperation';
import { SignInDto } from '@src/dto/SignInDto';
import { SignUpDto } from '@src/dto/SignUpDto';
import { UserDto } from '@src/dto/UserDto';
import { UserService } from '@src/user/user.service';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    @PublicOperation()
    @Post('signup')
    async signup(@Body() signUpDto: SignUpDto) {
        const hashedPasswrod = await this.authService.encryptPassword(signUpDto.password);
        const user = await this.userService.create(signUpDto, hashedPasswrod);

        return new UserDto(user);
    }

    @PublicOperation()
    @Post('/login')
    async login(@Body() signInDto: SignInDto) {
        const token = await this.authService.signin(signInDto.email, signInDto.password);

        return {
            access_token: token,
        };
    }
}
