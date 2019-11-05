const delimiter = '\n';
const replace: [RegExp, string] = [
  /fill="#[a-z0-9]{3,6}"/g,
  'fill="currentColor"',
];

const makeExport = (source: string): string => `export default ${source}`;

export const loader = (source: string): string =>
  makeExport(
    source
      .split(delimiter)
      .filter(svg => svg !== '')
      .map(svg => svg.replace(...replace))
      .join(delimiter),
  );
