/* eslint no-console: 'off' */
import chalk from 'chalk';
import capitalize from '@wavevision/ts-utils/strings/capitalize';

import camelCase from 'lodash.camelcase';

export const filterClassName = (className: string): string =>
  capitalize(camelCase(className));

export const logError = (e: Error, name: string): void =>
  console.error(`${chalk.bold(name)}: ${e.message}`);

export const logStart = (icon: string, message: string): void => {
  console.log('');
  console.log(icon, chalk.yellowBright.bold.underline(message));
  console.log('');
};

export const logSuccess = (message: string): void =>
  console.log(chalk.green('✔'), message);
