import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { GetPostsDto } from '../dtos/get-posts.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private metaOptionRepository: Repository<MetaOption>,

        private readonly userService: UsersService
    ) { }

    public async create(@Body() createPostDto: CreatePostDto) {
        let post = this.postRepository.create(createPostDto)
        return await this.postRepository.save(post)
    }

    public async findAll(postQuery: GetPostsDto, userId: number) {
        // const user = this.userService.findOneById(userId)

        let posts = await this.postRepository.find({
            relations: {
                metaOptions: true
            },
            skip: (postQuery.page - 1) * postQuery.limit,
            take: postQuery.limit
        })
        return posts
    }

    public createPost(createPostDto: CreatePostDto) {
        return 'create post'
    }

    public async delPost(id: number) {
        const post = await this.postRepository.findOneBy({ id })

        await this.postRepository.delete(id)

        await this.metaOptionRepository.delete(post.metaOptions.id)

        return { deleted: true, id }
    }
}
