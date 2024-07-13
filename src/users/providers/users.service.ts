import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { GetUsersParamDto } from "../dtos/get-user-param.dto";
import { AuthService } from "src/auth/providers/auth.service";

/**
 * 用户服务类
 */
@Injectable()
export class UsersService {
    /**
     * 使用authservice
     */
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

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