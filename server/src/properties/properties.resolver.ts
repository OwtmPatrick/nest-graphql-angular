import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PropertiesService } from './properties.service';
import { CommentsService } from '../comments/comments.service';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly commentsService: CommentsService,
  ) {}

  @ResolveField(() => [Comment])
  async comments(@Parent() property: Property) {
    const { id } = property;

    return this.commentsService.findByProperty(id);
  }
  @Mutation(() => Property)
  createProperty(
    @Args('createPropertyInput') createPropertyInput: CreatePropertyInput,
  ) {
    return this.propertiesService.create(createPropertyInput);
  }

  @Query(() => [Property], { name: 'properties' })
  findAll() {
    return this.propertiesService.findAll();
  }

  @Query(() => Property, { name: 'property' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.propertiesService.findOne(id);
  }

  @Mutation(() => Property)
  updateProperty(
    @Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput,
  ) {
    return this.propertiesService.update(
      updatePropertyInput.id,
      updatePropertyInput,
    );
  }

  @Mutation(() => Property)
  removeProperty(@Args('id', { type: () => String }) id: string) {
    // TODO: add removing comments of corresponding property
    return this.propertiesService.remove(id);
  }
}
