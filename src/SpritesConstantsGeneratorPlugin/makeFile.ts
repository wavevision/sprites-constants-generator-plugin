import fs from 'fs';
import path from 'path';

import { compile } from 'handlebars';

import { Options } from './types';

const declare = '<?php declare (strict_types = 1);';
const template = compile(
  fs.readFileSync(path.resolve(__dirname, '..', 'template.hbs')).toString(),
);

const makeFile = (
  className: string,
  constants: Array<{ name: string; value: string }>,
  options: Options,
): string => {
  const { namespace, output, useStaticClass, useStrictTypes } = options;
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
  fs.writeFileSync(
    path.resolve(output, `${className}.php`),
    template({
      className,
      constants,
      declare,
      namespace,
      useStaticClass,
      useStrictTypes,
    }),
    'UTF8',
  );
  return `${namespace}\\${className} created`;
};

export default makeFile;
