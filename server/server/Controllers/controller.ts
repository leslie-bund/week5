import { findAll } from "../Models/model";
import { IncomingMessage, Server, ServerResponse } from "http"

export async function getData(req: IncomingMessage, res: ServerResponse) {
    try {
        const data = await findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}