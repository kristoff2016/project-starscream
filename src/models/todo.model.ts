import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

export const TodoModelToken = Symbol('TodoModelToken');

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

export const TodoProvider = { provide: TodoModelToken, useValue: Todo };

export type TodoModel = typeof Todo;
export type TodoAttributes = Pick<Todo, 'id' | 'title' | 'description'>;
export type TodoAttributesOpt = Partial<TodoAttributes>;
