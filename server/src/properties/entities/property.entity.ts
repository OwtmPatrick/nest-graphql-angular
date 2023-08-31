import { PrimaryGeneratedColumn, OneToMany, Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../comments/entities/comment.entity';

@ObjectType()
@Entity()
export class Property {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ length: 500, nullable: false })
  name: string;
  @Field()
  @Column({ nullable: false })
  city: string;
  @Field()
  @Column({ nullable: false })
  state: string;
  @Field()
  @Column()
  photo: string;
  @Field(() => Int)
  @Column()
  availableUnits: number;
  @Field()
  @Column({ nullable: false })
  wifi: boolean;
  @Field()
  @Column({ nullable: false })
  laundry: boolean;
  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.property)
  comments: Comment[];
}
