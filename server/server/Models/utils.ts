import path from 'path';
import fs from 'fs/promises';
import { Datum } from "../interfaces";
import { IncomingMessage, ServerResponse } from "http";
import qs from "querystring";

// Dynamically get the contents stored in data.json
const dbFilePath = path.resolve(__dirname, 'database.json');

export async function getFileContent() {
    try {
        const content = await fs.readFile(dbFilePath, {encoding: 'utf8'});
        return content;
    } catch (error) {
        const firstContent = JSON.stringify([]);
        await fs.writeFile(dbFilePath, firstContent);
        const content = await fs.readFile(dbFilePath, {encoding: 'utf8'});
        return content;
    }
};

export async function writeToFile(datum: Datum) {
    const allData: string = await getFileContent();
    const newArr = [...JSON.parse(allData), datum];
    await fs.writeFile(dbFilePath, JSON.stringify(newArr));
}
export async function writeFile(data: Datum[]) {
    await fs.writeFile(dbFilePath, JSON.stringify(data));
}

export function getPostData(req: IncomingMessage, res:ServerResponse): Promise<Datum> {
    return new Promise((resolve, reject) => {
        let requestBody: string;
        req.on('data', (chunk: Buffer) => {
            requestBody = chunk.toString();
        })
        req.on('end', async () => {
            if (!requestBody) {
                res.writeHead(204, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({'message': 'No content provided'}));
            } else {
                try {
                    resolve(JSON.parse(requestBody));
                } catch (error) {
                    resolve(qs.parse(requestBody))
                }
            }
        })
    })
}
// export async function getAllData(){
//     return JSON.parse(await rawData);
// }