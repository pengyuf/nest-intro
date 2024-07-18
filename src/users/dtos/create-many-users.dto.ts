import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUsersDto } from "./create-users.dto";
import { Type } from "class-transformer";

export class CreateManyUsersDto{
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateUsersDto)
    users:CreateUsersDto[]
}