import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../database/prisma/prisma.service";

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getFeed(params: { page: number; limit: number }) {
    const { page, limit } = params;

    const safeLimit = Math.min(limit, 20);
    const skip = (page - 1) * safeLimit;

    const where = {
      isPublished: true,
    };

    const [blogs, total] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              email: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      }),
      this.prisma.blog.count({ where }),
    ]);

    return {
      data: blogs,
      meta: {
        total,
        page,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  }

    async getBySlug(slug: string) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        slug,
        isPublished: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        summary: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

}