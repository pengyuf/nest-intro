import { Injectable } from "@nestjs/common";
import { CreatePostMetaOptionsDto } from "../dtos/create-post-meta-options.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MetaOption } from "../meta-options.entity";
import { Repository } from "typeorm";

@Injectable()
export class MetaOptionsService{
    constructor(
        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository:Repository<MetaOption>
    ){}

    public async createMetaOption(createPostMetaOptionsDto:CreatePostMetaOptionsDto){
        const metaOption = this.metaOptionsRepository.create(createPostMetaOptionsDto)

        return await this.metaOptionsRepository.save(metaOption)
    }
}