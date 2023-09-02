import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { FilterPropertyInput } from './dto/filter-property.input';

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

  async filter(filterPropertyInput: FilterPropertyInput): Promise<Property[]> {
    const { search, state, wifi, laundry } = filterPropertyInput;

    const qb = this.propertyRepository.createQueryBuilder('property');

    if (search) {
      qb.andWhere('property.name like :name', { name: `%${search}%` });
    }

    if (state) {
      qb.andWhere('property.state like :state', { state: `%${state}%` });
    }

    if (wifi) {
      qb.andWhere('property.wifi = :wifi', { wifi: true });
    }

    if (laundry) {
      qb.andWhere('property.laundry = :laundry', { laundry: true });
    }

    return await qb.getMany();
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
