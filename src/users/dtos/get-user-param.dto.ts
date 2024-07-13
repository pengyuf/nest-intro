import { IsInt, IsOptional } from "class-validator";
import {Type} from "class-transformer"
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersParamDto{
    @ApiPropertyOptional({
        description:'参数描述',
        example:1234
    })
    @IsOptional()
    @IsInt()
    @Type(()=>Number) // param始终传入的是字符串，需要指定对应参数的转换类型（要大写）
    id?:string;
}