import { CreateCommentInput } from './create-comment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => String)
  id: string;
  @Field(() => String)
  text: string;
}
