import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '../../../states/entities/state.entity';
import { StatesRepository } from './states.repository';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesRepository],
  exports: [StatesRepository],
})
export class StatesRepositoryModule {}
