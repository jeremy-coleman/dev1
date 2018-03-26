import * as _ from 'lodash';

import { LeafCondition, RuleEffect, UISchemaElement } from '../models/uischema';
import { IJsonFormsStore } from '../reducers';
import { toDataPath } from './path';
import { resolveData } from './resolvers';


// TODO: pass in uischema and data instead of props and state
export const evalVisibility = (uischema: UISchemaElement, data: any) => {
  // TODO condition evaluation should be done somewhere else
  if (!_.has(uischema, 'rule.condition')) {
    return true;
  }
  const condition = uischema.rule.condition as LeafCondition;
  const value = resolveData(data, toDataPath(condition.scope));
  const equals = value === condition.expectedValue;

  switch (uischema.rule.effect) {
    case RuleEffect.HIDE: return !equals;
    case RuleEffect.SHOW: return equals;
    default:
    // visible by default
    return true;
  }
};

export const evalEnablement = (uischema: UISchemaElement, data: any) => {

  if (!_.has(uischema, 'rule.condition')) {
    return true;
  }

  const condition = uischema.rule.condition as LeafCondition;
  const value = resolveData(data, toDataPath(condition.scope));
  const equals = value === condition.expectedValue;

  switch (uischema.rule.effect) {
    case RuleEffect.DISABLE: return !equals;
    case RuleEffect.ENABLE: return equals;
    default:
    // enabled by default
    return true;
  }
};

export const isVisible = (props, store: IJsonFormsStore) => {

  if (props.uischema.rule) {
    return evalVisibility(props.uischema, store.coreStore.extractData);
  }

  return true;
};

export const isEnabled = (props, store: IJsonFormsStore) => {

  if (props.uischema.rule) {
    return evalEnablement(props.uischema, store.coreStore.extractData);
  }

  return true;
};
