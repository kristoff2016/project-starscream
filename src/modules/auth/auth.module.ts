import { Module } from '@nestjs/common';

import { UserProvider } from '../../models/user.model';
import { AuthController } from './auth.controller';

@Module({
  controllers: [ AuthController ],
  components: [ UserProvider ]
})
export class AuthModule {}
