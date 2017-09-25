import { Component } from '@nestjs/common';

import { Todo } from './todos.interfaces';

@Component()
export class TodosService {
  private readonly todos: Todo[] = [
    {
      id: 1,
      title: 'Do Mobx Homework!',
      createdDate: new Date()
    },
    {
      id: 2,
      title: 'Redux is boring!',
      createdDate: new Date()
    },
    {
      id: 3,
      title: 'Nestjs is weird!',
      createdDate: new Date()
    }
  ];

  async createTodo() {}

  async getTodos() {
    return Promise.resolve(this.todos);
  }

  async getOneTodo(id: number) {
    return Promise.resolve(this.todos.find(t => t.id === id));
  }
}
