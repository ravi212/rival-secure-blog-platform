import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogsService } from '../services/blogs.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth/jwt-auth.guard';

@Controller('blogs')
@UseGuards(JwtAuthGuard)
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateBlogDto) {
    return this.blogsService.create(req.user.userId, dto);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateBlogDto) {
    return this.blogsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') id: string) {
    return this.blogsService.delete(req.user.userId, id);
  }
}