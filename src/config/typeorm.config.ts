import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 4000,
  username: 'postgres',
  password: 'Carlczerny10',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.ty'],
  synchronize: true,
};
