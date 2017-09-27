import { ReflectMetadata } from '@nestjs/common';

import { AUTH_KEY } from '../constants/metadata-keys';

export const Auth = ReflectMetadata(AUTH_KEY, 'required');
export const AuthOpt = ReflectMetadata(AUTH_KEY, 'optional');
