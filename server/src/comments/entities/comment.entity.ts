import { PrimaryGeneratedColumn, ManyToOne, Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Property } from '../../properties/entities/property.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Comment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field({ nullable: false })
  @Column({ length: 500, nullable: false })
  text: string;
  @Field(() => Property)
  @ManyToOne(() => Property, (property) => property.comments)
  property: Property;
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
