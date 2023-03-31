import { NotFoundException } from '@nestjs/common';

class CategoryNotFoundException extends NotFoundException {
  constructor(categoryId: number) {
    super(`Category with id ${categoryId} not found`);
  }
}

export default CategoryNotFoundException;
