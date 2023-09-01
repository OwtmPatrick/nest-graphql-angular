import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { CreateStateInput } from './dto/create-state.input';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  async create(createStateDto: CreateStateInput): Promise<void> {
    try {
      await this.statesRepository.insert(createStateDto);
    } catch (e) {
      console.error('Unable to create state: ', e);
    }
  }

  async findOne(id: string): Promise<State> {
    return await this.statesRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<State[]> {
    return await this.statesRepository.find();
  }
}
