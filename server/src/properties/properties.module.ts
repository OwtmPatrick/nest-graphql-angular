import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesService } from './properties.service';
import { PropertiesResolver } from './properties.resolver';
import { PropertiesRepositoryModule } from '../db/repositories/properties/properties.repository.module';
import { Property } from './entities/property.entity';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    PropertiesRepositoryModule,
    CommentsModule,
  ],
  providers: [PropertiesResolver, PropertiesService],
})
export class PropertiesModule {}
