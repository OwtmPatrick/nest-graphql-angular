import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterPropertyInput {
  @Field({ nullable: true })
  search: string;
  @Field({ nullable: true })
  state: string;
  @Field({ nullable: true })
  wifi: boolean;
  @Field({ nullable: true })
  laundry: boolean;
}
