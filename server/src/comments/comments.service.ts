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
    const { propertyId, userId } = createCommentInput;

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
