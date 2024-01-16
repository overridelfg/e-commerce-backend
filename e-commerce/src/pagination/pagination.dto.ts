import { IsOptional } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  page?: string;

  @IsOptional()
  perPage?: string;
}
