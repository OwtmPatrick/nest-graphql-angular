import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CommentsRepositoryModule } from '../db/repositories/comments/comments.repository.module';
import { UsersModule } from '../users/users.module';
import { PropertiesRepositoryModule } from '../db/repositories/properties/properties.repository.module';
import { UsersRepositoryModule } from '../db/repositories/users/users.repository.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    CommentsRepositoryModule,
    UsersModule,
    PropertiesRepositoryModule,
    UsersRepositoryModule,
  ],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
