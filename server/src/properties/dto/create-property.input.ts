import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePropertyInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  city: string;
  @Field(() => String)
  state: string;
  @Field(() => String)
  photo: string;
  @Field(() => Int)
  availableUnits: number;
  @Field(() => Boolean)
  wifi: boolean;
  @Field(() => Boolean)
  laundry: boolean;
}
