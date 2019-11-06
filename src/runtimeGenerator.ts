type RuntimeGenerator = {
  symbol: { request: { file: string } };
};

const runtimeGenerator = ({ symbol }: RuntimeGenerator): string =>
  `export default __webpack_public_path__ + ${JSON.stringify(
    symbol.request.file,
  )}`;

export = runtimeGenerator;
