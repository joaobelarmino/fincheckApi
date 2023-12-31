import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()

export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    const category = await this.prismaService.category.findMany(findManyDto);

    return category;
  }
}
