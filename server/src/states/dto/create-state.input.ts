import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStateInput {
  @Field(() => String)
  title: string;
}
