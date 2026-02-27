import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from '../services/public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('feed')
  getFeed(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.publicService.getFeed({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('blogs/:slug')
  getBlogBySlug(@Param('slug') slug: string) {
    return this.publicService.getBySlug(slug);
  }
}