import fs from 'fs';
import path from 'path';

import { compile } from 'handlebars';

import { logSuccess } from './utils';
import { Options } from './types';

const declare = '<?php declare (strict_types = 1);';

const template = compile(
  fs.readFileSync(path.resolve(__dirname, 'template.hbs')).toString(),
);

const makeFile = async (
  className: string,
  constants: Array<{ name: string; value: string }>,
  options: Options,
): Promise<void> => {
  const { namespace, useStaticClass, useStrictTypes } = options;
  fs.writeFileSync(
    path.resolve(options.output, `${className}.php`),
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
  logSuccess(`${namespace}\\${className} created`);
};

export default makeFile;
