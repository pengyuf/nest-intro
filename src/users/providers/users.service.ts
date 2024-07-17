import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-user-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUsersDto } from "../dtos/create-users.dto";

/**
 * 用户服务类
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    public async createUser(createUserDto:CreateUsersDto){
        const existingUser = this.userRepository.findOne({
            where:{email:createUserDto.email}
        })

        let newUser = this.userRepository.create(createUserDto)
        newUser = await this.userRepository.save(newUser)

        return newUser

    }

    /**
     * 查询所有用户
     */
    public findAll(
        getUsersParamDto: GetUsersParamDto,
        limit: number,
        page: number
    ) {

        const isAuth = this.authService.isAuth()
        console.log(isAuth)

        return [
            {
                firstName: 'John',
                email: 'John@qq.com'
            },
            {
                firstName: 'Alice',
                email: 'Alice@qq.com'
            },
        ]
    }

    /**
      * 根据id查询用户
      */
    public findOneById(
        id: string
    ) {
        return {
            id: 123,
            firstName: 'John',
            email: 'John@qq.com'
        }
    }
}