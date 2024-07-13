import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService
    ) { }

    public login(email: string, password: string, id: string) {
        const user = this.userService.findOneById('1234')
        return "simple_token"
    }

    public isAuth() {
        return true
    }
}
