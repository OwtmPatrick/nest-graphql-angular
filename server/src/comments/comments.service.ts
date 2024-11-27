import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';

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

  async create(createCommentInput: CreateCommentInput) {
    const { identifiers } = await this.commentsRepository.insert({
      ...createCommentInput,
      property: createCommentInput.propertyId as unknown as Property,
      user: createCommentInput.userId as unknown as User,
    });

    return { id: identifiers[0].id, text: createCommentInput.text };
  }

  async findOne(id: string): Promise<Comment> {
    return await this.commentsRepository.findOne({ where: { id } });
  }
}
