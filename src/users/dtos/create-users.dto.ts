import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUsersDto{
    @IsString()
    @IsNotEmpty({
        message:'firstName必填'
    })
    @MinLength(3)
    @MaxLength(96)
    firstName:string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName?:string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/,{
        message:'至少8位且必有数字+特殊字符+字母'
    })
    password:string;
}