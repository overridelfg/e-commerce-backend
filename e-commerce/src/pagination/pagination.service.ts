import { Injectable } from '@nestjs/common';
import { PaginationDTO } from './pagination.dto';

@Injectable()
export class PaginationService {
  getPagination(dto: PaginationDTO, defaultPerPage: number = 10) {
    const page: number = dto.page ? +dto.page : 1;
    const perPage: number = dto.perPage ? +dto.perPage : defaultPerPage;

    const skip: number = (page - 1) * perPage;

    return { skip };
  }
}
