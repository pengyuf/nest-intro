import { Module, NestMiddleware, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { Tag } from './tags/tag.entity';
import { MetaOption } from './meta-options/meta-options.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PaginationModule } from './common/pagination/pagination.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule, PostsModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:['.env.development']
      envFilePath:!ENV?'.env':`.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        entities: [User, Post, Tag, MetaOption],
        type: 'postgres',
        synchronize: true,
        port: configService.get("DATABASE_PORT"),
        username: configService.get("DATABASE_USER"),
        password: configService.get("DATABASE_PASSWORD"),
        host: configService.get("DATABASE_HOST"),
        database: configService.get("DATABASE_NAME"),
      })
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {

}
