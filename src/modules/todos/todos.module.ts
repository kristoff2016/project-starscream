import { Module } from '@nestjs/common';

import { SequelizeProvider } from '../../common/sequelize';
import { TodoProvider } from '../../models/todo.model';
import { TodosController } from './todos.controller';

@Module({
  controllers: [ TodosController ],
  components: [ SequelizeProvider, TodoProvider ]
})
export class TodosModule {}
