type RuntimeGenerator = {
  symbol: { id: string };
};

const runtimeGenerator = ({ symbol }: RuntimeGenerator): string =>
  `export default ${JSON.stringify(symbol.id)}`;

export = runtimeGenerator;
