import { IsInt, IsOptional } from "class-validator";
import {Type} from "class-transformer"

export class GetUsersParamDto{
    
    @IsOptional()
    @IsInt()
    @Type(()=>Number) // param始终传入的是字符串，需要指定对应参数的转换类型（要大写）
    id?:string;
}