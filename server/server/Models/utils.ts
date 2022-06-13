import path from 'path';
import fs from 'fs/promises';
import { Datum } from "../interfaces";

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
// export async function getAllData(){
//     return JSON.parse(await rawData);
// }