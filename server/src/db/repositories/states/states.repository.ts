import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/states/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesRepository extends Repository<State> {
  constructor(
    @InjectRepository(State)
    private repository: Repository<State>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
