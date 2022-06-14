import http, { IncomingMessage, Server, ServerResponse } from 'http';
import https from 'https';
import { parser } from 'html-metadata-parser';

/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const urlObject = new URL(<string>req.url, `http://${req.headers.host}`);
    if (req.method === "GET") {
      (async () => {
        var result = await parser(`https:/` + urlObject.pathname);
        console.log(JSON.stringify(result, ['og'],3));
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

server.listen(3001);
