import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { PropertiesRepository } from '../db/repositories/properties/properties.repository';
import { UsersRepository } from '../db/repositories/users/users.repository';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private propertiesRepository: PropertiesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async findByProperty(propertyId: string): Promise<Comment[]> {
    return await this.commentsRepository
      .createQueryBuilder('comment')
      .where('comment.propertyId= :propertyId', { propertyId })
      .getMany();
  }

  async create(createCommentInput: CreateCommentInput) {
    const { propertyId, userId, text } = createCommentInput;

    const property = await this.propertiesRepository.findOne({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { identifiers } = await this.commentsRepository.insert({
      text,
      property: createCommentInput.propertyId as unknown as Property,
      user: createCommentInput.userId as unknown as User,
    });

    return { id: identifiers[0].id, text };
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    return comment;
  }
}
