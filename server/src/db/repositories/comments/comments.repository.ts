import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../../comments/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private repository: Repository<Comment>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
