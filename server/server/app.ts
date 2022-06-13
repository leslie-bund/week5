import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getData, createDatum } from "./Controllers/controller";
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // if (req.method === "GET") {
    //   res.end(JSON.stringify({ name: "hello" }));
    // }
    switch (req.method) {
      case 'GET' :
        // Insert code here
        getData(res);
        break;
      case 'POST' :
        // Insert code here
        createDatum(req, res);
        break;
      case 'PUT' :
        // Insert code here
        break;
      case 'DELETE' :
        // Insert code here
        break;
      default: 
        console.log(`${req.method} Request is not accounted for within this API`);
        break;
    }
  }
);

server.listen(3005, ()=> console.log('Server is running'));
