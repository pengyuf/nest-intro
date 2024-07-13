import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength, ValidateNested } from "class-validator"
import { postType } from "../enums/postType.enum"
import { postStatus } from "../enums/postStatus.enum"
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto"
import { Type } from "class-transformer"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    title: string

    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType
 
    @IsNotEmpty()
    @IsString()
    slug: string

    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus

    @IsString()
    @IsOptional()
    content?: string

    @IsJSON()
    @IsOptional()
    schema?: string

    @IsUrl() 
    @IsOptional()
    featuredImageUrl?: string

    @IsISO8601()
    @IsOptional()
    publishOn? : Date 

    @IsOptional()
    @IsArray()
    @IsString({each:true})
    @MinLength(3,{each:true})
    tags?: string[]

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto[]
}