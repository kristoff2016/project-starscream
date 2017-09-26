import { Messages as IMessages } from 'indicative';

import { MESSAGES_KEY, RULES_KEY } from '../constants/metadata-keys';

export const Rules = (rule: string): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  const rules = Reflect.getMetadata(RULES_KEY, target) || {};
  rules[propertyKey] = rule;
  Reflect.defineMetadata(RULES_KEY, rules, target);
};

export const Messages = (messages: IMessages): PropertyDecorator => (target: Object, propertyKey: string | symbol) => {
  const msgs = Reflect.getMetadata(MESSAGES_KEY, target) || {};
  for (const key in messages) {
    if (messages.hasOwnProperty(key)) {
      const msg = messages[key];
      msgs[`${propertyKey}.${key}`] = msg;
    }
  }
  Reflect.defineMetadata(MESSAGES_KEY, msgs, target);
};
