import { Module } from '@nestjs/common';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [ TodosController ],
  components: [ TodosService ]
})
export class TodosModule {}
