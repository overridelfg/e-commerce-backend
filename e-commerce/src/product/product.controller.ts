import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.schema';
import { GetAllProductsDto } from './dto/get-all.product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  async getAllProducts(
    @Query() queryDto: GetAllProductsDto,
  ): Promise<Product[]> {
    return this.productService.getAllProducts(queryDto);
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Get('products/categories/:category')
  async getProductsByCategory(
    @Param('category') category: string,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategory(category);
  }
}
