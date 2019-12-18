import { JSONSchema7 } from 'json-schema';

const schema = {
  additionalProperties: false,
  properties: {
    ignoreErrors: {
      default: false,
      description:
        'Run generator even if there are errors in webpack compilation.',
      type: 'boolean',
    },
    namespace: {
      description: 'PHP namespace of the generated class.',
      type: 'string',
    },
    output: {
      description:
        'Absolute path to target directory where the classes should be put.',
      type: 'string',
    },
    replace: {
      default: undefined,
      description:
        'Function returning pattern to replace with empty string in constant name.',
      instanceOf: 'Function',
    },
    sprites: {
      description:
        'Source SVG sprites (paths relative to webpack output directory).',
      items: {
        description: 'SVG sprite path relative to webpack output directory.',
        type: 'string',
      },
    },
    useStaticClass: {
      default: true,
      description: 'Should the generated class use Nette\\StaticClass trait?',
      type: 'boolean',
    },
    useStrictTypes: {
      default: true,
      description: 'Should the generated class declare strict types mode?',
      type: 'boolean',
    },
  },
  required: ['namespace', 'output', 'sprites'],
  type: 'object',
};

export default schema as JSONSchema7;
