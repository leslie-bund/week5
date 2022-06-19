import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getData, createDatum, updateData, removeData } from "./Controllers/controller";
// import url from 'url';
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
        updateData(req, res);
        break;
      case 'DELETE' :
        // Insert code here
        removeData(req, res);
        break;
      default: 
        console.log(`${req.method} Request is not accounted for within this API`);
        break;
    }
  }
);
// Required modifications based on review
/**
 * 1. When a data is updated, the entire object that is updated should be returned in the response instead of just an object containing the updated fields only
 * 2. Modify the getFileContent() function to return an object instead of a string(POST, GET)
 * 3. when adding new data in the create() function (POST) - refactor the function to prevent calling getFileContent() again before writing to the database.json file
 * 4. Modify the utils, to combine both the writeToFile() and writeFile() functions
 */

server.listen(3005, ()=> console.log('Server is running'));
