import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dot';
import { Request } from 'express'
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request
    ) { }

    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>
    ):Promise<Paginated<T>> {
        let results = await repository.find({
            skip: (paginationQuery.page - 1) * paginationQuery.limit,
            take: paginationQuery.limit
        })

        const baseURL = this.request.protocol + '://' + this.request.headers.host + '/'
        const newUrl = new URL(this.request.url, baseURL)

        const totalItems = await repository.count()
        const totalPages = Math.ceil(totalItems / paginationQuery.limit);
        const nextPage = paginationQuery.page == totalPages ? paginationQuery.page : paginationQuery.page + 1
        const previousPage = paginationQuery.page == 1 ? paginationQuery.page : paginationQuery.page - 1

        const finalResponse:Paginated<T> = {
            data:results,
            meta:{
                itemsPerPage:paginationQuery.limit,
                totalItems:totalItems,
                currentPage:paginationQuery.page,
                totalPages:totalPages,

            },
            links:{
                first:``,
                last:``,
                current:``,
                next:``,
                previous:``
            }
        }

        return finalResponse
    }
}
