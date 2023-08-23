import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeOrmConfig';

export default new DataSource(typeOrmConfig);
