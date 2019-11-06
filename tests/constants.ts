import { resolve } from 'path';

export const ENTRY = resolve(__dirname, 'assets', 'index.ts');
export const TEMP = resolve(__dirname, '..', 'temp');
export const OUTPUT_PATH = resolve(TEMP, 'dist');
export const SPRITES_DIR = resolve(TEMP, 'App', 'Sprites');
