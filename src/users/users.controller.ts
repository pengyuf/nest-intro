import { Body, Controller, DefaultValuePipe, Delete, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Get('/:id?')
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.usersService.findAll(getUsersParamDto,limit,page)
    }


    @Post()
    public createUser(@Body() createUsersDto: CreateUsersDto) {
        console.log(createUsersDto)
        return 'send a create user'
    }


    @Patch()
    public PatchUser(@Body() patchUserDto: PatchUserDto) {
        console.log(patchUserDto)
        return patchUserDto
    }
}
