import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
