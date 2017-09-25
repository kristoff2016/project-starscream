import { Controller, Get, Post } from '@nestjs/common';

import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async addTodo() {
    return 'Add Todo';
  }

  @Get()
  async getTodos() {
    return this.todosService.getTodos();
  }
}
