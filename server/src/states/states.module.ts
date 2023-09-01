import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { State } from './entities/state.entity';
import { StatesResolver } from './states.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesService, StatesResolver],
})
export class StatesModule {}
