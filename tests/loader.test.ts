import loader from '../src/loader';

const source = '<svg fill="#bdbdbd"></svg>\n\n<svg fill="#eee"></svg>';

describe('loader', () => {
  it('returns de-colorized SVG source', () => {
    expect(loader(source)).toBe(
      'export default <svg fill="currentColor"></svg>\n<svg fill="currentColor"></svg>',
    );
  });
});
