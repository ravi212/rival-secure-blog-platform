import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { slugify } from '../../../common/utils/slugify';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBlogDto) {
    const baseSlug = slugify(dto.title);
    let slug = baseSlug;

    let counter = 1;
    while (await this.slugExists(slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    return this.prisma.blog.create({
      data: {
        ...dto,
        slug,
        userId,
      },
    });
  }

  async update(userId: string, blogId: string, dto: UpdateBlogDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.userId !== userId) {
      throw new ForbiddenException('You are not allowed to edit this blog');
    }

    let updatedSlug = blog.slug;

    if (dto.title && dto.title !== blog.title) {
      const baseSlug = slugify(dto.title);
      let slug = baseSlug;
      let counter = 1;

      while (await this.slugExists(slug, blogId)) {
        slug = `${baseSlug}-${counter++}`;
      }

      updatedSlug = slug;
    }

    return this.prisma.blog.update({
      where: { id: blogId },
      data: {
        ...dto,
        slug: updatedSlug,
      },
    });
  }

  async delete(userId: string, blogId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (blog.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this blog');
    }

    await this.prisma.blog.delete({
      where: { id: blogId },
    });

    return { message: 'Blog deleted successfully' };
  }

  private async slugExists(slug: string, excludeId?: string) {
    const existing = await this.prisma.blog.findFirst({
      where: {
        slug,
        NOT: excludeId ? { id: excludeId } : undefined,
      },
    });

    return !!existing;
  }
}
