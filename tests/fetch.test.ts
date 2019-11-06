import nock from 'nock';

import fetch from '../src/SpritesConstantsGeneratorPlugin/fetch';

describe('fetch', () => {
  afterEach(() => nock.cleanAll());
  describe('success', () => {
    it('returns fetched SVG', async () => {
      nock('http://somedomain.dev')
        .get('/test-url')
        .reply(200, '<svg></svg>');
      await expect(fetch('http://somedomain.dev/test-url')).resolves.toBe(
        '<svg></svg>',
      );
    });
  });
  describe('error', () => {
    const m = nock('http://somedomain.dev').get('/test-url');
    it('rejects with error message', async () => {
      m.reply(500);
      await expect(fetch('http://somedomain.dev/test-url')).rejects.toThrow(
        'Unable to fetch sprite contents from webpack-dev-server.',
      );
    });
    it('rejects with request error', async () => {
      m.replyWithError('Some error');
      await expect(fetch('http://somedomain.dev/test-url')).rejects.toThrow(
        'Some error',
      );
    });
  });
});
