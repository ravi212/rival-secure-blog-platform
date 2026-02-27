import { Module } from '@nestjs/common';
import { LikesController } from './controllers/likes.controller';
import { LikesService } from './services/likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
