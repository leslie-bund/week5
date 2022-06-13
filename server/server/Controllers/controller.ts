import { findAll, create } from "../Models/model";
import { getPostData } from "../Models/utils";
import { IncomingMessage, ServerResponse } from "http";
import qs from "querystring";
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