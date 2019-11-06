import runtimeGenerator from '../src/runtimeGenerator';

describe('runtimeGenerator', () => {
  it('return symbol export', () => {
    expect(
      runtimeGenerator({ symbol: { request: { file: 'some-file' } } }),
    ).toBe('export default __webpack_public_path__ + "some-file"');
  });
});
