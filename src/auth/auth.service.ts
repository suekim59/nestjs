//nest g service auth로 생성되는 파일

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService:JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}> {
        const { username, password} = authCredentialsDto;
        //username에 앞 뒤 공백 제거
        const user = await this.userRepository.findOne({ username});

        if(user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 ( Secret + Payload )
            const payload = { username } //중요한 정보 넣으면 안됨
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }else {
            throw new UnauthorizedException('login failed')
        }
    }
}
