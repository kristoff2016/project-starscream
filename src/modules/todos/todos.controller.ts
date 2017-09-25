import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

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

  @Get('/:id')
  async getOneTodo(@Req() req: Request) {
    return this.todosService.getOneTodo(req.params.id);
  }
}
