import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/pagination/pagination.dto';

export enum EnumProductSort {
  HIGH_PRCIE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductsDto extends PaginationDTO {
  @IsOptional()
  @IsEnum(EnumProductSort)
  sort?: EnumProductSort;

  @IsOptional()
  @IsString()
  searhTerm?: string;
}
