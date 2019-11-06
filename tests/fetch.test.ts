import nock from 'nock';

import fetch from '../src/SpritesConstantsGeneratorPlugin/fetch';

describe('fetch', () => {
  afterEach(() => nock.cleanAll());
  describe('success', () => {
    beforeEach(() => {
      nock('http://somedomain.dev')
        .get('/test-url')
        .reply(200, '<svg></svg>');
      it('returns fetched SVG', async () => {
        await expect(fetch('http://somedomain.dev/test-url')).resolves.toBe(
          '<svg></svg>',
        );
      });
    });
  });
  describe('error', () => {
    beforeEach(() => {
      nock('http://somedomain.dev')
        .get('/test-url')
        .reply(500);
    });
    it('returns error message', async () => {
      await expect(fetch('http://somedomain.dev/test-url')).rejects.toThrow(
        'Unable to fetch sprite contents from webpack-dev-server.',
      );
    });
  });
});
