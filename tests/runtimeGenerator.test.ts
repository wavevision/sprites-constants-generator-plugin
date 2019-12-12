import runtimeGenerator from '../src/runtimeGenerator';

describe('runtimeGenerator', () => {
  it('return symbol export', () => {
    expect(runtimeGenerator({ symbol: { id: 'symbol-id' } })).toBe(
      'export default __webpack_public_path__ + "symbol-id"',
    );
  });
});
