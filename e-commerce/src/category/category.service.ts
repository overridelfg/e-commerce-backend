import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/mongo/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDTO } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async createCategory(categoryDto: CategoryDTO): Promise<Category> {
    const newCategory = await this.categoryModel.create(categoryDto);
    return newCategory;
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id).exec();

      if(!category) {
        throw new NotFoundException('Category not found');
      }
      return category;
    } catch (err) {
      throw err;
    }

  }

  async updateCategory(
    id: string,
    categoryDto: CategoryDTO,
  ): Promise<Category> {
    try{
      const existingCategory = this.categoryModel.findByIdAndUpdate(
        id,
        categoryDto,
      );
      if (!existingCategory) {
        throw new NotFoundException(`Category #${categoryDto.name} not found`);
      }
      return existingCategory;
    }catch(err) {
        throw err;
    }

  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new NotFoundException(`Category not found`);
    }
    return deletedCategory;
  }
}
