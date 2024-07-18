import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-user-param.dto";
import { AuthService } from "src/auth/providers/auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUsersDto } from "../dtos/create-users.dto";
import { ConfigService } from "@nestjs/config"
/**
 * 用户服务类
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        private readonly configService: ConfigService
    ) { }

    public async createUser(createUserDto: CreateUsersDto) {
        let existingUser = undefined

        try {
            existingUser = this.userRepository.findOne({
                where: { email: createUserDto.email }
            })
        } catch (error) {
            throw new RequestTimeoutException('发生错误请稍后再试', {
                description: '数据库连接错误'
            })
        }

        if (existingUser) {
            throw new BadRequestException('用户已存在')
        }

        let newUser = this.userRepository.create(createUserDto)

        try {
            newUser = await this.userRepository.save(newUser)
        } catch (error) {
            throw new RequestTimeoutException('发生错误请稍后再试', {
                description: '数据库连接错误'
            })
        }


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
        throw new HttpException({
            status:HttpStatus.FORBIDDEN,
            error:'Api 不存在'
        },
        HttpStatus.FORBIDDEN,
        {
            description:'Api已移除'
        }
        )
    }

    /**
      * 根据id查询用户
      */
    public findOneById(
        id: number
    ) {
        let user = undefined

        try {
            user = this.userRepository.findOneBy({
                id
            })
        } catch (error) {
            throw new RequestTimeoutException('发生错误请稍后再试', {
                description: '数据库连接错误'
            })
        }
        
        if(!user){
           throw new BadRequestException('用户不存在')
        }

        return user
    }
}