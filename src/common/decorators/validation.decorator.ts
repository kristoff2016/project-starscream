import { Messages as IMessages } from 'indicative';

import { MESSAGES_KEY, RULES_KEY } from '../constants/metadata-keys';

export const Rules = (rule: string | object, nested?: object | object[]): PropertyDecorator => (
  target: Object,
  propertyKey: string | symbol
) => {
  let rules = Reflect.getMetadata(RULES_KEY, target) || {};
  if (typeof rule === 'string') {
    rules[propertyKey] = rule;
    if (nested) {
      if (Array.isArray(nested)) {
        for (const nestedVal of nested) {
          for (const key in nestedVal) {
            if (nestedVal.hasOwnProperty(key)) {
              rules[`${propertyKey}.*.${key}`] = nestedVal[key];
            }
          }
        }
      } else {
        for (const key in nested) {
          if (nested.hasOwnProperty(key)) {
            const val = nested[key];
            rules[`${propertyKey}.${key}`] = val;
          }
        }
      }
    }
  } else {
    rules = { ...rules, ...rule };
  }
  Reflect.defineMetadata(RULES_KEY, rules, target);
};

export const Messages = (messages: IMessages, scoped: boolean = false): PropertyDecorator => (
  target: Object,
  propertyKey: string | symbol
) => {
  let msgs = Reflect.getMetadata(MESSAGES_KEY, target) || {};
  if (scoped) {
    for (const key in messages) {
      if (messages.hasOwnProperty(key)) {
        const msg = messages[key];
        msgs[`${propertyKey}.${key}`] = msg;
      }
    }
  } else {
    msgs = { ...msgs, ...messages };
  }
  Reflect.defineMetadata(MESSAGES_KEY, msgs, target);
};
