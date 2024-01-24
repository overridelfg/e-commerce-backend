import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/product/product.schema';
import { PaginationService } from 'src/pagination/pagination.service';
import { ReviewService } from 'src/review/review.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, PaginationService, ReviewService],
})
export class ProductModule {}
