import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from 'src/auth/providers/auth.service';
import { ConfigService } from '@nestjs/config';
import { CreateUsersDto } from '../dtos/create-users.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    public async createMany(createManyUsersDto: CreateManyUsersDto) {
        let newUsers = []

        // 创建queryRunner
        const queryRunner = this.dataSource.createQueryRunner()

        // 连接
        await queryRunner.connect()

        // 开始事务
        await queryRunner.startTransaction()

        try {
            for (let user of createManyUsersDto.users) {
                 const newUser = queryRunner.manager.create(User,user)
                 const result = await queryRunner.manager.save(newUser)
                 newUsers.push(result)
                 // 全部成功，就提交事务
                 queryRunner.commitTransaction()
            }
        } catch (error) {
                 // 有一个失败，就回滚
                 queryRunner.rollbackTransaction()
        } finally {
            //    try {
            //          queryRunner.release()
            //    } catch (error) {
            //         throw new BadRequestException('事务释放失败')
            //    }
        }

        return newUsers
    }
}
