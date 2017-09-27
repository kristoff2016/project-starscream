import { Body, Controller, Inject, Post } from '@nestjs/common';
import { createHash } from 'crypto';
import { sign } from 'jsonwebtoken';

import { BadRequestException } from '../../common/exceptions';
import { default as User, UserAttributesOpt, UserModel, UserModelToken } from '../../models/user.model';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(UserModelToken) private readonly userModel: UserModel) {}

  @Post('register')
  async register(@Body() { username, password }: RegisterDto) {
    const user = await this.userModel.create<User, UserAttributesOpt>({
      username,
      password
    });
    return user;
  }

  @Post('login')
  async login(@Body() { username, password }: LoginDto) {
    const user = await this.userModel.findByUsername(username);
    if (!user) throw new BadRequestException('The username and password you entered did not match our records.');

    const passwordHash = createHash('SHA512').update(password).digest('base64');
    if (passwordHash !== user.password) {
      throw new BadRequestException('The password you entered is incorrect.');
    }

    const accessToken = sign({ id: user.id, username }, process.env.SECRET || 'SECRET');
    return { accessToken };
  }
}
