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

// @desc    Adds a new datum to the Data
// @route   POST /
export async function createDatum(req: IncomingMessage, res: ServerResponse) {
    const requestBody: string = await getPostData(req, res);
    let recievedDatum: Datum;
    try {
        const { 
            organization,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address,
            ceo,
            country,
            // id: id,
            noOfEmployees,
            employees,
        }: Datum = JSON.parse(requestBody);
        recievedDatum = {
            organization: organization,
            createdAt: createdAt,
            updatedAt: updatedAt,
            products: products,
            marketValue: marketValue,
            address: address,
            ceo: ceo,
            country,
            // "id": id,
            noOfEmployees: Number(noOfEmployees),
            employees: employees,
        }
        const newDatum = await create(recievedDatum);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newDatum));
    } catch (error) {
        const { 
            organization,
            createdAt,
            updatedAt,
            products,
            marketValue,
            address,
            ceo,
            country,
            // id: id,
            noOfEmployees,
            employees,
        }: Datum = qs.parse(requestBody);
        recievedDatum = {
            organization: organization,
            createdAt: createdAt,
            updatedAt: updatedAt,
            products: products,
            marketValue: marketValue,
            address: address,
            ceo: ceo,
            country,
            // "id": id,
            noOfEmployees: Number(noOfEmployees),
            employees: employees,
        }
    const newDatum = await create(recievedDatum);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(newDatum));
    }
}