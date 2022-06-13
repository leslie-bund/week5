import { getFileContent, writeToFile } from "./utils";
import { Datum } from "../interfaces";

export function findAll() {
    return new Promise(async (resolve, reject) => {
        resolve(await getFileContent());
    })
}

export async function create (datumObj: Datum) {
    const allDataString: string = await getFileContent();
    const allData = JSON.parse(allDataString);
    datumObj.id = (allData.pop()?.id + 1) || 1;
    await writeToFile(datumObj);
    return datumObj;
}