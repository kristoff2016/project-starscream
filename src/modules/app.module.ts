import { Module } from '@nestjs/common';

import { TodosModule } from './todos/todos.module';

@Module({
  modules: [ TodosModule ]
})
export class ApplicationModule {}
