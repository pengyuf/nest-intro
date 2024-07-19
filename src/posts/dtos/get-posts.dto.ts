import { IsDate, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../common/pagination/dtos/pagination-query.dot";
import { IntersectionType } from "@nestjs/mapped-types";


class GetPostsBaseDto{
    @IsOptional()
    @IsDate()
    startDate?:Date;
    
    @IsOptional()
    @IsDate()
    endDate?:Date;
}


export class GetPostsDto extends IntersectionType(GetPostsBaseDto,PaginationQueryDto) {

}