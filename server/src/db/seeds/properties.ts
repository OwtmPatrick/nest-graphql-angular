import { INestApplication, Logger } from '@nestjs/common';
import { PropertiesRepository } from '../repositories/properties/properties.repository';
import { PropertiesService } from '../../properties/properties.service';

const properties = [
  {
    name: 'Acme Fresh Start Housing',
    city: 'Chicago',
    state: 'IL',
    photo:
      'https://ap.rdcpix.com/96038abc2485d6d6f3b3da222f9fa04fl-b4243798034od-w480_h360_x2.jpg',
    availableUnits: 4,
    wifi: true,
    laundry: true,
  },
  {
    name: 'A113 Transitional Housing',
    city: 'Santa Monica',
    state: 'CA',
    photo:
      'https://ap.rdcpix.com/6d98fc1a4295f22ad9f507e60211bcb5l-b222942536od-w480_h360_x2.jpg',
    availableUnits: 0,
    wifi: false,
    laundry: true,
  },
  {
    name: 'Warm Beds Housing Support',
    city: 'Juneau',
    state: 'AK',
    photo:
      'https://ap.rdcpix.com/23c4cc6dc08649afbbe0a6c2adb230d0l-b3153087246od-w480_h360_x2.jpg',
    availableUnits: 1,
    wifi: false,
    laundry: false,
  },
  {
    name: 'Homesteady Housing',
    city: 'Chicago',
    state: 'IL',
    photo:
      'https://ap.rdcpix.com/251fd9fd6ea8227cfa4f9326828a69dfl-m157731196od-w480_h360_x2.jpg',
    availableUnits: 1,
    wifi: true,
    laundry: false,
  },
  {
    name: 'Happy Homes Group',
    city: 'Gary',
    state: 'IN',
    photo:
      'https://ap.rdcpix.com/8f6cc950e29d064d7745ca6925c0716el-b2417986350od-w480_h360_x2.jpg',
    availableUnits: 1,
    wifi: true,
    laundry: false,
  },
  {
    name: 'Hopeful Apartment Group',
    city: 'Oakland',
    state: 'CA',
    photo:
      'https://ap.rdcpix.com/28013bbe1dfac7c2cd922a2a0dcb9bd5l-m2599827964od-w480_h360_x2.jpg',
    availableUnits: 2,
    wifi: true,
    laundry: true,
  },
  {
    name: 'Seriously Safe Towns',
    city: 'Oakland',
    state: 'CA',
    photo:
      'https://ap.rdcpix.com/4df221d711f1fa65c470164dec4a85e5l-m797676433od-w480_h360_x2.jpg',
    availableUnits: 10,
    wifi: false,
    laundry: false,
  },
  {
    name: 'Capital Safe Towns',
    city: 'Portland',
    state: 'OR',
    photo:
      'https://ap.rdcpix.com/02b66c4139258d69bd76840769cd0097l-b4051717223od-w480_h360_x2.jpg',
    availableUnits: 6,
    wifi: true,
    laundry: true,
  },
];

export const seedProperties = async (app: INestApplication): Promise<void> => {
  const propertiesService = app.get(PropertiesService);
  const propertiesRepository = app.get(PropertiesRepository);
  const logger = new Logger();

  for (const property of properties) {
    const existedProperty = await propertiesRepository.findOne({
      where: { name: property.name },
    });

    if (existedProperty) {
      logger.error(`Property with name ${property.name} already exist`);
    } else {
      await propertiesService.create(property);
      logger.debug(`Property with name ${property.name} successfully created`);
    }
  }
};
