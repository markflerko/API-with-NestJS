import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from './category.entity';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/postNotFund.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryService: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoryService.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoryService.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoryService.update(id, category);
    const updatedCategory = await this.categoryService.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }
}
