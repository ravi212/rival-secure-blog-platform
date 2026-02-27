import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':blogId')
  create(
    @Param('blogId') blogId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    return this.commentsService.create(blogId, req.user.id, dto);
  }

  @Get(':blogId')
  getByBlog(@Param('blogId') blogId: string) {
    return this.commentsService.getByBlog(blogId);
  }
}
