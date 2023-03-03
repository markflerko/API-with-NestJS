import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from './category.entity';
import UpdateCategoryDto from './dto/updateCategory.dto';
import CategoryNotFoundException from './exceptions/postNotFund.exception';

@Injectable()
export class CategoryService {
  /**
   * @ignore
   */
  constructor(
    @InjectRepository(Category)
    private categoryService: Repository<Category>,
  ) {}

  /**
   * @deprecated
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  getAllCategories() {
    return this.categoryService.find({ relations: ['posts'] });
  }

  /**
   * A method that get a category from the database
   * @param id An id of a category. A category with this id should exist in the database
   */
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

  /**
   * See the [definition of the UpdateCategoryDto file]{@link UpdateCategoryDto} to see a list of required properties
   */
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
