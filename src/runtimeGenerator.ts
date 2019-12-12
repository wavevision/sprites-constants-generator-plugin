type RuntimeGenerator = {
  symbol: { id: string };
};

const runtimeGenerator = ({ symbol }: RuntimeGenerator): string =>
  `export default __webpack_public_path__ + ${JSON.stringify(symbol.id)}`;

export = runtimeGenerator;
