import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT) || 3307,
  username: process.env.DB_USER || 'rikkei',
  password: process.env.DB_PASSWORD || 'Password123',
  database: process.env.DB_NAME || 'rk_training',
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  autoLoadEntities: true,
  synchronize: true,
};

export default databaseConfig;
