import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return await this.statesRepository.find();
  }
}
