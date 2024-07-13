import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    constructor(private readonly userService:UsersService){}

    public findAll(userId:string){
        const user = this.userService.findOneById(userId)
        return [
            {
                userId:user.id,
                title:'test title',
                content:'test post content'
            },
            {
                userId:user.id,
                title:'test title 2',
                content:'test post content 2'
            },
        ]
    }
}
