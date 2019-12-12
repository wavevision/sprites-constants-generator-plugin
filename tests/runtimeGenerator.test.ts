import runtimeGenerator from '../src/runtimeGenerator';

describe('runtimeGenerator', () => {
  it('return symbol export', () => {
    expect(runtimeGenerator({ symbol: { id: 'symbol-id' } })).toBe(
      'export default "symbol-id"',
    );
  });
});
