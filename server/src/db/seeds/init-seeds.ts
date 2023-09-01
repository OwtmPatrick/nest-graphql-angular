import { AppBootstrap } from '../../appBootstrap';
import { seedUsers } from './users';
import { seedStates } from './states';
import { seedProperties } from './properties';

const initSeeds = async () => {
  const app = await AppBootstrap.initApp();

  await seedUsers(app);
  await seedStates(app);
  await seedProperties(app);
};

(async () => {
  await initSeeds();
  process.exit(0);
})();
