import { get } from 'http';

const fetch = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const request = get(url, response => {
      if (response.statusCode !== 200) {
        reject(
          new Error('Unable to fetch sprite contents from webpack-dev-server.'),
        );
      }
      const data: string[] = [];
      response.on('data', chunk => data.push(chunk));
      response.on('end', () => resolve(data.join('')));
    });
    request.on('error', error => reject(error));
  });

export default fetch;
