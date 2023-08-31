import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../../../properties/entities/property.entity';
import { PropertiesRepository } from './properties.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertiesRepository],
  exports: [PropertiesRepository],
})
export class PropertiesRepositoryModule {}
