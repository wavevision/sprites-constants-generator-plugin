export interface Options {
  ignoreErrors?: boolean;
  namespace: string;
  output: string;
  replace?: (sprite: string) => RegExp | string;
  sprites: string[];
  useStaticClass?: boolean;
  useStrictTypes?: boolean;
}
