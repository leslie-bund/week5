import http, { get, IncomingMessage, Server, ServerResponse } from "http";
import { getData } from "./Controllers/controller";
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
        getData(req, res);
        break;
      case 'POST' :
        // Insert code here
        break;
      case 'PUT' :
        // Insert code here
        break;
      case 'DELETE' :
        // Insert code here
        break;
      default: 
        console.log('Request is not accounted for within this API');
        break;
    }
  }
);

server.listen(3005, ()=> console.log('Server is running'));
