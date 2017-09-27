import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

export class BadRequestException extends HttpException {
  constructor(response: string | object) {
    super(response, HttpStatus.BAD_REQUEST);
  }
}

export class ForbiddenException extends HttpException {
  constructor(response: string | object) {
    super(response, HttpStatus.FORBIDDEN);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(response: string | object) {
    super(response, HttpStatus.UNAUTHORIZED);
  }
}
