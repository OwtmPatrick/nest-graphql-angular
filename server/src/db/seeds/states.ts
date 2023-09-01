import { INestApplication, Logger } from '@nestjs/common';
import { StatesRepository } from '../repositories/states/states.repository';
import { StatesService } from '../../states/states.service';

const states: string[] = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const seedStates = async (app: INestApplication): Promise<void> => {
  const statesService = app.get(StatesService);
  const statesRepository = app.get(StatesRepository);
  const logger = new Logger();

  for (const title of states) {
    const state = await statesRepository.findOne({ where: { title } });

    if (state) {
      logger.error(`State with title ${title} already exist`);
    } else {
      await statesService.create({ title });
      logger.debug(`State with title ${title} successfully created`);
    }
  }
};
