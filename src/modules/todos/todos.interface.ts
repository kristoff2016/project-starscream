import { Messages, Rules } from '../../common/validation';

export class AddTodoDto {
  @Rules('required|string|min:2')
  @Messages({ string: 'The title field has to be a string.' })
  readonly title: string;

  @Rules('string|max:255') readonly description: string;
}

export class GetTodosDto {
  @Rules('integer') readonly limit: number;
  @Rules('float') readonly offset: number;
}

export interface Todo {
  id: number;
  title: string;
  createdDate: Date;
}
