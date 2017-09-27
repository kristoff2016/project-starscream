import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT = 'mysql' } = process.env;

export const SequelizeToken = Symbol('SequelizeToken');

export const sequelize = new Sequelize({
  host: DB_HOST!,
  port: +DB_PORT!,
  name: DB_NAME!,
  username: DB_USERNAME!,
  password: DB_PASSWORD!,
  dialect: DB_DIALECT,
  modelPaths: [ path.resolve(__dirname, '../models') ],
  logging: false
});

export const SequelizeProvider = {
  provide: SequelizeToken,
  useFactory: async () => {
    await sequelize.sync();
    return sequelize;
  }
};
