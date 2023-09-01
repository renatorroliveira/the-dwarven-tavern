import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '@src/user/user.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async encryptPassword(pwd: string) {
        const saltRounds = this.configService.get<number>('auth.passowrdSaltRounds')!;

        this.logger.debug(`Hashing password using ${saltRounds} salting rounds...`);
        const hashedPwd = await bcrypt.hash(pwd, saltRounds);
        return hashedPwd;
    }

    async isPasswordEqual(rawPwd: string, hashedPwd: string) {
        return bcrypt.compare(rawPwd, hashedPwd);
    }

    async signin(email: string, password: string) {
        const user = await this.userService.retrieveByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }
        if (!(await this.isPasswordEqual(password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, username: user.email };
        return this.jwtService.signAsync(payload);
    }
}
