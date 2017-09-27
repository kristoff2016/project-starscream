import { Body, Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';

import { default as Todo, TodoAttributesOpt, TodoModel, TodoModelToken } from '../../models/todo.model';
import { AddTodoDto, GetTodosDto } from './todos.interface';

@Controller('todos')
export class TodosController {
  constructor(@Inject(TodoModelToken) private readonly todoModel: TodoModel) {}

  @Post()
  async addTodo(@Body() body: AddTodoDto) {
    const todo = await this.todoModel.create<Todo, TodoAttributesOpt>({
      title: body.title,
      description: body.description
    });
    return todo;
  }

  @Get()
  async getTodos(@Query() { limit, offset }: GetTodosDto) {
    const todos = await this.todoModel.findAll({
      limit,
      offset
    });
    return todos;
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: number) {
    const todo = await this.todoModel.findOne<Todo>({
      where: { id }
    });
    return todo;
  }
}
