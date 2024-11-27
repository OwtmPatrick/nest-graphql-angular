import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class CreateCommentInput {
  @Field({ nullable: false })
  text: string;
  @Field({ nullable: false })
  propertyId: string;
  @Field({ nullable: false })
  userId: string;
}
