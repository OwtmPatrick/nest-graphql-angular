import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/properties/entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesRepository extends Repository<Property> {
  constructor(
    @InjectRepository(Property)
    private repository: Repository<Property>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
