import { PartialType } from '@nestjs/mapped-types'
import {CreateUsersDto} from './create-users.dto'

export class PatchUserDto extends PartialType(CreateUsersDto){ // 使用PartialType继承父级的属性，并且将所有属性变为可选的

}