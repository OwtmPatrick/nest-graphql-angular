import { AppBootstrap } from '../../appBootstrap';
import { seedUsers } from './users';

const initSeeds = async () => {
  const app = await AppBootstrap.initApp();
  await seedUsers(app);
};

(async () => {
  await initSeeds();
  process.exit(0);
})();
