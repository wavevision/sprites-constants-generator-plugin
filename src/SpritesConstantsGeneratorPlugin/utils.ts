import capitalize from '@wavevision/ts-utils/strings/capitalize';

import camelCase from 'lodash.camelcase';

export const filterClassName = (className: string): string =>
  capitalize(camelCase(className));
