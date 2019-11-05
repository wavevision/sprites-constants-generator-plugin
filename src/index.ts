import SpritesConstantsGeneratorPlugin from './SpritesConstantsGeneratorPlugin';

export const loader = (source: string): string =>
  `export default ${source
    .split('\n')
    .filter(svg => svg !== '')
    .map(svg => svg.replace(/fill="#[a-z0-9]{3,6}"/g, 'fill="currentColor"'))
    .join('\n')}`;

export const runtimeGenerator = ({
  symbol,
}: {
  symbol: { request: { file: string } };
}): string =>
  `export default __webpack_public_path__ + ${JSON.stringify(
    symbol.request.file,
  )}`;

export default SpritesConstantsGeneratorPlugin;
