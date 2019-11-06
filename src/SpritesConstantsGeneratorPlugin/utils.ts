/* eslint no-console: 'off' */
import chalk from 'chalk';

export const logStart = (icon: string, message: string): void => {
  console.log('');
  console.log(icon, chalk.blue.bold.underline(message));
  console.log('');
};

export const logSuccess = (message: string): void =>
  console.log(chalk.green('✔'), message);
