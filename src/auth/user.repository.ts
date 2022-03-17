import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        const { username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password:hashedPassword});
        
        //올바른 에러 코드를 throw 하기 위한 코드
        try {
            await this.save(user);
        }catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username');
            }else {
                throw new InternalServerErrorException();
            }
        }
        

    }

}