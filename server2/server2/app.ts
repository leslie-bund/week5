import http, { IncomingMessage, Server, ServerResponse } from 'http';
// import https from 'https';
import { parser } from 'html-metadata-parser';

/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const urlObject = new URL(<string>req.url, `http://${req.headers.host}`);
    if (req.method === "GET") {
      (async () => {
        var result = await parser(`https:/` + urlObject.pathname);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          meta: {
            title: result?.meta?.title || '',
            description: result?.meta?.description || ''
          },
          images: result.images,
        }));
      })();
    }
  }
);

/**
 * Notes for refactoring 
 * - Adjust the POST method to collect the scraping url from the request body.
 * - Add the link to favicon image to the images array
 */

server.listen(3001);
