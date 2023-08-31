import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CommentsRepositoryModule } from '../db/repositories/comments/comments.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CommentsRepositoryModule],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
