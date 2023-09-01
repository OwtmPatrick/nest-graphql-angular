import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class State {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field({ nullable: false })
  @Column({ nullable: false })
  title: string;
}
