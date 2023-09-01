import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/entities/user.entity';
import { Property } from '../properties/entities/property.entity';
import { Comment } from '../comments/entities/comment.entity';
import { State } from '../states/entities/state.entity';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Property, Comment, State],
  synchronize: true,
  migrations: ['src/db/migration/**/*.ts'],
};
