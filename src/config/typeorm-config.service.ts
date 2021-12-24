import { Injectable } from '@nestjs/common';
import path = require('path');
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
type DB_TYPE = "mysql"

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor() { }

  static getMySQLType(): DB_TYPE {
    return process.env.DATABASE_TYPE as DB_TYPE
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: TypeormConfigService.getMySQLType(),
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' ? true : false,
      logging: process.env.DATABASE_LOGGING === 'true' ? true : false,
      entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  }
}
