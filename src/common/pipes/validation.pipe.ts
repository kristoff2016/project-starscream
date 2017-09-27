import { ArgumentMetadata, HttpStatus, Pipe, PipeTransform } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { extend, Messages, validateAll, ValidationMethod } from 'indicative';

import { MESSAGES_KEY, RULES_KEY } from '../constants/metadata-keys';
import { isNumeric } from '../numbers';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  private customMessages: Messages = {};

  constructor({ customRules, customMessages }: ValidationPipeOptions) {
    if (customRules) {
      for (const r of customRules) {
        if (typeof r === 'function') {
          extend(r.name, r);
        } else {
          for (const key in r) {
            if (r.hasOwnProperty(key)) {
              extend(key, r[key]);
            }
          }
        }
      }
    }
    this.customMessages = Object.assign(this.customMessages, customMessages);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, type } = metadata;

    const rules = Reflect.getMetadata(RULES_KEY, metatype!.prototype as any);
    const messages = Reflect.getMetadata(MESSAGES_KEY, metatype!.prototype as any);

    if (type !== 'body') {
      if (typeof value === 'object') {
        for (const v in value) {
          if (Object.prototype.hasOwnProperty.call(value, v) && isNumeric(value[v])) {
            value[v] = +value[v];
          }
        }
      } else if (isNumeric(value)) {
        value = +value;
      }
    }

    await validateAll(value, rules, Object.assign(this.customMessages, messages)).catch(errors => {
      const errorInfo = {
        message: 'Validation failed, unable to process the request.',
        errors
      };
      throw new HttpException(errorInfo, HttpStatus.UNPROCESSABLE_ENTITY);
    });

    return value;
  }
}

interface ValidationPipeOptions {
  customRules?: (ValidationMethod | { [x: string]: ValidationMethod })[];
  customMessages?: Messages;
}
