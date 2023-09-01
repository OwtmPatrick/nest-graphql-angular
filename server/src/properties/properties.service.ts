import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}
  async create(createPropertyInput: CreatePropertyInput) {
    try {
      await this.propertyRepository.insert(createPropertyInput);

      return createPropertyInput;
    } catch (e) {
      console.error('unable to create property: ', e);
    }
  }

  async findAll(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  async findOne(id: string): Promise<Property> {
    return await this.propertyRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePropertyInput: UpdatePropertyInput) {
    await this.propertyRepository.update(id, updatePropertyInput);

    return await this.propertyRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
      },
    });
    await this.propertyRepository.remove(property);

    return property;
  }
}
