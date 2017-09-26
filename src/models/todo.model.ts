import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

export const TodoToken = Symbol('TodoModelToken');

@Table({ name: { singular: 'todo', plural: 'todos' }, tableName: 'todos' })
export default class Todo extends Model<Todo> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  title: string;

  @Column description?: string;
}

export const TodoProvider = { provide: TodoToken, useValue: Todo };

export type TodoService = typeof Todo;
export type TodoAttributes = Pick<Todo, 'id' | 'title' | 'description'>;
export type TodoAttributesOpt = Partial<TodoAttributes>;
