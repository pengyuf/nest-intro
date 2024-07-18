import { Body, Controller, DefaultValuePipe, Delete, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { GetUsersParamDto } from './dtos/get-user-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';

@Controller('users')
@ApiTags('用户模块')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/:id?')
    @ApiOperation({
        summary: '接口描述'
    })
    @ApiResponse({
        status: 200,
        description: '响应示例'
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        description: '描述',
        example: 10,
        required: false
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        description: '描述',
        example: 1,
        required: false
    })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.usersService.findAll(getUsersParamDto, limit, page)
    }


    @Post()
    public createUser(@Body() createUsersDto: CreateUsersDto) {
        return this.usersService.createUser(createUsersDto)
    }

    @Post('create-many')
    public createMany(@Body() createManyUsersDto: CreateManyUsersDto) {
        return this.usersService.createMany(createManyUsersDto)
    }


    @Patch()
    public PatchUser(@Body() patchUserDto: PatchUserDto) {
        console.log(patchUserDto)
        return patchUserDto
    }
}
