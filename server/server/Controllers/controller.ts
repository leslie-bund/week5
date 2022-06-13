import { findAll, create, update, remove } from "../Models/model";
import { getPostData } from "../Models/utils";
import { IncomingMessage, ServerResponse } from "http";
import { Datum } from "../interfaces";

// @desc    Gets all Data stored
// @route   GET /
export async function getData(res: ServerResponse) {
    try {
        const data = await findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    } catch (err) {
        console.log(err);
    }
}

// @desc    Adds a new datum to the Database
// @route   POST /
export async function createDatum(req: IncomingMessage, res: ServerResponse) {
    let recievedDatum: Datum = await getPostData(req, res);
    const newDatum = await create(recievedDatum);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(newDatum));
}

// @desc    Updates a product
// @route   PUT /?id=*
export async function updateData(req: IncomingMessage, res: ServerResponse) {
    let recievedDatum: Datum = await getPostData(req, res);
    const datumUrl = new URL(<string>req.url, 'http://localhost:3005');
    if (datumUrl.searchParams.has('id')) {
      const datumId = Number(datumUrl.searchParams.get('id'));
      const updateStatus = await update(recievedDatum, datumId);
      if (!updateStatus) {
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'File not updated, invalid data provided'}));
      }
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(recievedDatum));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({'message': 'No content id provided'}));
    }
}

// @desc    Deletes a product
// @route   DELETE /?id=*
export async function removeData(req: IncomingMessage, res: ServerResponse) {
    const datumUrl = new URL(<string>req.url, 'http://localhost:3005');
    if (datumUrl.searchParams.has('id')) {
        const datumId = Number(datumUrl.searchParams.get('id'));
        await remove(datumId);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Deleted Successfully'}));
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'No content id provided'}));
    }
}