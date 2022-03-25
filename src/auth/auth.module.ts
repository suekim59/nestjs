//nest g module auth로 생성되는 파일

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
    imports: [
      PassportModule.register({
        defaultStrategy: 'jwt',
      }),
      JwtModule.register({
        secret: process.env.JWT_SECRET || jwtConfig.secret, //Secret Text used when making token ( randomly chosen)
        signOptions:{
          expiresIn: jwtConfig.expiresIn,
        }
      }),
      TypeOrmModule.forFeature([UserRepository])
    ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  //auth 모듈에서 사용하기 위해 넣어주는 것
  exports: [JwtStrategy, PassportModule]  // 다른 모듈에서 사용하기 위해 넣어주는 것
})
export class AuthModule {}
