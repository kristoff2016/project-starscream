import { Messages, Rules } from '../../common';

export class RegisterDto {
  @Rules({ username: 'required|string|min:3|max:255' })
  readonly username: string;

  @Rules({ password: 'required|string|min:6|max:255' })
  readonly password: string;

  @Rules({ passwordConfirm: 'required|string|same:password' })
  @Messages({ 'passwordConfirm.same': `Both passwords are not the same.` })
  readonly passwordConfirm: string;
}

export class LoginDto {
  @Rules({ username: 'required|string' })
  readonly username: string;

  @Rules({ username: 'required|string' })
  readonly password: string;
}
