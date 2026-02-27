import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(blogId: string, userId: string, dto: CreateCommentDto) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        blogId,
        userId,
        content: dto.content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return comment;
  }

  async getByBlog(blogId: string) {
    return this.prisma.comment.findMany({
      where: { blogId },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }
}
