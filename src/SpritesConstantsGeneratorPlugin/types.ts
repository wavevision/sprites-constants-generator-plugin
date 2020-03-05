export type Assets = Record<string, { source: () => string }>;

export interface Options {
  ignoreErrors?: boolean;
  namespace: string;
  output: string;
  replace?: (symbol: string) => [RegExp | string, string];
  sprites: string[];
  useStaticClass?: boolean;
  useStrictTypes?: boolean;
}
