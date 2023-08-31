import { CreatePropertyInput } from './create-property.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePropertyInput extends PartialType(CreatePropertyInput) {
  @Field(() => String)
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  city: string | undefined;
  @Field({ nullable: true })
  state: string;
  @Field({ nullable: true })
  photo: string;
  @Field({ nullable: true })
  availableUnits: number;
  @Field({ nullable: true })
  wifi: boolean;
  @Field({ nullable: true })
  laundry: boolean;
}
