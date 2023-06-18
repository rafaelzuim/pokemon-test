import {Request} from "express";
import {PaginationResponse} from "../types/PaginationResponse";

const DEFAULT_PAGE_SIZE = 10;
export class PaginationService {
    constructor(private req: Request) {
    }

    paginateResults(data: any[]): PaginationResponse {
        const { page} = this.req.query;
        const pageSize = this.req.query.pageSize ? parseInt(this.req.query.pageSize as string, 10) : DEFAULT_PAGE_SIZE;
        const totalData = data.length;
        const totalPages = Math.ceil(totalData / pageSize);
        const currentPage = page ? parseInt(page as string, 10) : 1;
        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        const paginatedData = data.slice(start, end);

        const response : PaginationResponse = {
            totalData,
            totalPages,
            currentPage,
            pageSize,
            data: paginatedData,
        };

        return response;
    }

}