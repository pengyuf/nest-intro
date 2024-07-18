import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('帖子模块')
export class PostsController {
    constructor(private readonly postsService:PostsService){}

    @Get('/:userId?')
    public getPosts(@Param('userId') userId:string){
        return this.postsService.findAll(userId)
    }

    @Post()
    public createPost(@Body() createPostDto:CreatePostDto){
        return this.postsService.create(createPostDto)
    }

    @Patch()
    public updatePost(@Body() patchPostDto:PatchPostDto){
        console.log(patchPostDto)
    }

    @Delete()
    public delPost(@Query('id',ParseIntPipe) id:number){
        return this.postsService.delPost(id)
    }
}
