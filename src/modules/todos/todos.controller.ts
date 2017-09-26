import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';

import { BadRequestException } from '../../common/exceptions/bad-request.exception';
import { default as Todo, TodoAttributesOpt, TodoService, TodoToken } from '../../models/todo.model';
import { AddTodoDto, GetTodosDto } from './todos.interface';

@Controller('todos')
export class TodosController {
  constructor(@Inject(TodoToken) private readonly todosService: TodoService) {}

  @Post()
  async addTodo(@Body() body: AddTodoDto) {
    if (body.title === 'James') {
      throw new BadRequestException({ message: (this as any).call() });
    }
    const todo = await this.todosService.create<Todo, TodoAttributesOpt>({
      title: body.title,
      description: body.description
    });
    return todo;
  }

  @Get()
  async getTodos(@Query() { limit, offset }: GetTodosDto) {
    const todos = await this.todosService.findAll({
      limit,
      offset
    });
    return todos;
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: number) {
    const todo = await this.todosService.findOne<Todo>({
      where: { id }
    });
    return todo;
  }
}
