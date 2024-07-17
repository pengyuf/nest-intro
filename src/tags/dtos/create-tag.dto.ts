import { ApiProperty } from "@nestjs/swagger";
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateTagDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    name:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    slug:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsJSON()
    schema?:string;

    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?:string;
}