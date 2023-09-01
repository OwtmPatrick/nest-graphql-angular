import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { State } from './entities/state.entity';
import { StatesResolver } from './states.resolver';
import { StatesRepositoryModule } from '../db/repositories/states/states.repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([State]), StatesRepositoryModule],
  providers: [StatesService, StatesResolver],
})
export class StatesModule {}
