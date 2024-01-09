import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { ProductDocument } from 'src/product/product.schema';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products/')
  async getAllProducts(): Promise<ProductDocument[]> {
    return this.productService.getAllProducts();
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string): Promise<ProductDocument> {
    return this.productService.getProductById(id);
  }
}
