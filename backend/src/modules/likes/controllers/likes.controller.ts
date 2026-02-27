import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth/jwt-auth.guard';
import { LikesService } from '../services/likes.service';

@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':blogId')
  like(@Param('blogId') blogId: string, @Req() req) {
    return this.likesService.like(blogId, req.user.id);
  }

  @Delete(':blogId')
  unlike(@Param('blogId') blogId: string, @Req() req) {
    return this.likesService.unlike(blogId, req.user.id);
  }
}
