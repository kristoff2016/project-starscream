import { ValidationMethod } from 'indicative';

import { isFloat } from './numbers';

export const customRules: CustomRules = [ { float: isFloatRule } ];

type CustomRules = (ValidationMethod | { [x: string]: ValidationMethod })[];

export function isFloatRule(data: any, field: string, message: string, args: any[], get: Function) {
  return new Promise((resolve, reject) => {
    const fieldValue = get(data, field);
    if (!fieldValue) resolve('validation skipped');

    return isFloat(fieldValue) ? resolve('validation passed') : reject(`The ${field} field is not a float.`);
  });
}
