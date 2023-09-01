import { Resolver, Query } from '@nestjs/graphql';
import { StatesService } from './states.service';
import { State } from './entities/state.entity';

@Resolver(() => State)
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}

  @Query(() => [State], { name: 'states' })
  findAll() {
    return this.statesService.findAll();
  }
}
