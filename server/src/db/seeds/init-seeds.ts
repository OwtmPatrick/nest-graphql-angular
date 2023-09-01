import { AppBootstrap } from '../../appBootstrap';
import { seedUsers } from './users';
import { seedStates } from './states';

const initSeeds = async () => {
  const app = await AppBootstrap.initApp();
  await seedUsers(app);
  await seedStates(app);
};

(async () => {
  await initSeeds();
  process.exit(0);
})();
