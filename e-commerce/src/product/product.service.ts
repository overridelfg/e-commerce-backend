import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/product.schema';
import { Model } from 'mongoose';
import { PaginationService } from 'src/pagination/pagination.service';
import { EnumProductSort, GetAllProductsDto } from './dto/get-all.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private paginationService: PaginationService,
  ) {}

  async getAllProducts(dto: GetAllProductsDto = {}): Promise<Product[]> {
    const { sort, searchTerm } = dto;
    const { skip } = this.paginationService.getPagination(dto);

    const sortBy = {};

    if (sort === EnumProductSort.LOW_PRICE) {
      sortBy['price'] = 1;
    } else if (sort === EnumProductSort.HIGH_PRCIE) {
      sortBy['price'] = -1;
    } else if (sort === EnumProductSort.OLDEST) {
      sortBy['createdAt'] = 1;
    } else {
      sortBy['createdAt'] = -1;
    }

    console.log(searchTerm);
    return searchTerm
      ? await this.productModel
          .find({
            $or: [
              {
                title: {
                  $regex: searchTerm,
                  $options: 'i',
                },
                // description: {
                //   $regex: searchTerm,
                //   $options: 'i',
                // },
                // category: {
                //   name: searchTerm,
                // },
              },
            ],
          })
          .skip(skip)
          .sort(sortBy)
      : await this.productModel.find().skip(skip).sort(sortBy);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.productModel.find({ category: category });
  }
}
