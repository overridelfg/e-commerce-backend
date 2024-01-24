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

  async getAllProducts(dto: GetAllProductsDto = {}) {
    const { sort, searchTerm, categoryNames, minPrice, maxPrice } = dto;
    const { skip, perPage } = this.paginationService.getPagination(dto);

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

    const categoryNamesList  = categoryNames ? categoryNames.split(',') : '';

    const productsQuery = {
        $and: [
          searchTerm ? { $or: [
            {
              "title": {
                $regex: searchTerm,
                $options: 'i',
              },
            },
          ]} : {},
          categoryNames ? {"category.name": categoryNamesList} : {},
          minPrice ? { price: { $gte: minPrice}} : {}
        ]
    }

    const totalSize = (await this.productModel.find(productsQuery)).length;
    const products = await this.productModel.find(productsQuery).skip(skip).limit(perPage).sort(sortBy);

    console.log(products.length)
    const productsListSize = await this.productModel.countDocuments();

    return {
      products,
      length: totalSize
    };
  }

  async getProductById(id: string): Promise<Product> {
    return await this.productModel.findById(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await this.productModel.find({ "category.name": category });
  }
}
