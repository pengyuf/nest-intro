import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { postType } from "./enums/postType.enum";
import { postStatus } from "./enums/postStatus.enum";
import { CreatePostMetaOptionsDto } from "../meta-options/dtos/create-post-meta-options.dto";
import {MetaOption} from "../meta-options/meta-options.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: 'varchar',
        length:512,
        nullable: false
    })
    title: string

    @Column({
        type: 'enum',
        enum:postType,
        nullable: false,
        default:postType.POST
    })
    postType: postType

    
    @Column({
        type: 'varchar',
        length:256,
        nullable: false,
        unique:true
    })
    slug: string

    @Column({
        type: 'enum',
        enum:postStatus,
        default:postStatus.DRAFT,
        nullable: false
    })
    status: postStatus

    @Column({
        type: 'text',
        nullable: true
    })
    content?: string

    @Column({
        type: 'text',
        nullable: true
    }) 
    schema?: string

    @Column({
        type: 'varchar',
        length:1024,
        nullable: true
    })
    featuredImageUrl?: string

    @Column({
        type: 'timestamp',
        nullable: true
    })
    publishOn?: Date

    @OneToOne(()=>MetaOption,{
        cascade:true,
        eager:true
    })
    @JoinColumn()
    metaOptions?: MetaOption

    tags?: string[]

}