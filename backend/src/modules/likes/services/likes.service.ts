import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async like(blogId: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    try {
      await this.prisma.like.create({
        data: {
          blogId,
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('You already liked this blog');
    }

    const likeCount = await this.prisma.like.count({
      where: { blogId },
    });

    return {
      message: 'Liked successfully',
      likeCount,
    };
  }

  async unlike(blogId: string, userId: string) {
    await this.prisma.like.deleteMany({
      where: {
        blogId,
        userId,
      },
    });

    const likeCount = await this.prisma.like.count({
      where: { blogId },
    });

    return {
      message: 'Unliked successfully',
      likeCount,
    };
  }
}
