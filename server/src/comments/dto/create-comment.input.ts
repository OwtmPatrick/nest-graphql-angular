import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class CreateCommentInput {
  @Field({ nullable: false })
  text: string;
  @Field()
  propertyId: string;
  @Field()
  userId: string;
}
