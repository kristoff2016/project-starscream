import { Messages, Rules } from '../../common/validation';
import { Gender, Song } from './todos.interface';

export class AddTodoDto {
  @Rules('required|string|min:2')
  @Messages({ string: 'The title field has to be a string.' })
  readonly title: string;

  @Rules('string|max:255') readonly description: string;

  @Rules({ sex: 'required_when:title,James' })
  @Messages({ required_when: 'Your name is James, so please tell me your gender.' }, true)
  readonly sex: Gender;

  @Rules('required|object', { title: 'required' })
  readonly song: Song;

  @Rules({
    songs: 'required|array',
    'songs.*.title': 'required|string',
    'songs.*.author': 'required|string'
  })
  @Messages({
    'songs.*.title.required': `The title of the song can not be empty.`,
    'songs.*.author.string': `The author's name must be a string.`
  })
  readonly songs: Song[];
}

export class GetTodosDto {
  @Rules('integer') readonly limit: number;
  @Rules('float') readonly offset: number;
}
