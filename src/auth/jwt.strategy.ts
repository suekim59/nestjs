import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable() 
//Nest.js can inject it anywhere this service is needed via DI

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository) //userRepository를 주입해줘야 함
        private userRepository: UserRepository
    ){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            //token type이 bearer token이므로 꼭 명시
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
