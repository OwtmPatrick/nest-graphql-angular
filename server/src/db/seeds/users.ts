import { INestApplication, Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories/users/users.repository';
import { UsersService } from '../../users/users.service';

export const seedUsers = async (app: INestApplication): Promise<void> => {
  const users = [
    { login: 'admin', password: 'admin', firstName: '', lastName: '' },
  ];
  const usersService = app.get(UsersService);
  const usersRepository = app.get(UsersRepository);
  const logger = new Logger();

  for (const { login, password } of users) {
    const user = await usersRepository.findOne({ where: { login } });

    if (!user) {
      await usersService.create({ login, password });
      logger.debug(`User ${login} successfully added`);
    }
  }
};
