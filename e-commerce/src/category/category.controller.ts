import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/mongo/category.schema';
import { CategoryDTO } from './category.dto';
import { Response } from 'express';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('categories')
  async getAllCategories(@Res() response: Response) {
    try {
      const categories = await this.categoryService.getAllCategories();
      console.log(categories);
      return response.status(HttpStatus.OK).json({
        message: 'All categories data found successfully',
        categories: categories,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get('categories/:id')
  async getCategoryById(@Res() response: Response, @Param('id') id: string) {
    try {
      const category = await this.categoryService.getCategoryById(id);
      return response.status(HttpStatus.OK).json({
        message: 'All categories data found successfully',
        category: category,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Post('categories/create')
  async createCategory(
    @Res() response: Response,
    @Body() categoryDto: CategoryDTO,
  ): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }

  @Put('categories/update/:id')
  async updateCategory(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() categoryDto: CategoryDTO,
  ){
    try{
      return this.categoryService.updateCategory(id, categoryDto);
    }catch(error) {
      return response.status(error.status).json(error.response);
    }

  }

  @Delete('categories/delete/:id')
  async deleteCategory(@Res() response: Response, @Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
