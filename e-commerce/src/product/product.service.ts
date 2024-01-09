import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductClass } from 'src/product/product.schema';
import { ProductDocument } from 'src/product/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductClass.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async getProductById(id: string): Promise<ProductDocument> {
    return await this.productModel.findById(id);
  }
}
