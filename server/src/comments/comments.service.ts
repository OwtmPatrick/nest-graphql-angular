import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findByProperty(propertyId: string): Promise<Comment[]> {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.propertyId= :propertyId', { propertyId })
      .getMany();
  }
}
