import { getFileContent, writeToFile, writeFile } from "./utils";
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

export async function remove (datumId: number) {
    const allDataString: string = await getFileContent();
    const allData = JSON.parse(allDataString);
    const newData = allData.filter((element: Datum) => element.id !== datumId);
    await writeFile(newData);
    return;
}

export async function update (datumObj: Datum, id: number): Promise<Boolean> {
    // Update the datum and return an update status
    const allDataString: string = await getFileContent();
    const allData = JSON.parse(allDataString);
    const toBeModified = allData.find((element: Datum) => element.id == id)
    // datumObj.id = (allData.pop()?.id + 1) || 1;
    if (!toBeModified) {
        return false;
    }

    allData[allData.indexOf(toBeModified)] = {
        organization: datumObj.organization || toBeModified.organization,
        createdAt: datumObj.createdAt || toBeModified.createdAt,
        updatedAt: datumObj.updatedAt || toBeModified.updatedAt,
        products: datumObj.products || toBeModified.products,
        marketValue: datumObj.marketValue || toBeModified.marketValue,
        address: datumObj.address || toBeModified.address,
        ceo: datumObj.ceo || toBeModified.ceo,
        noOfEmployees: datumObj.noOfEmployees || toBeModified.noOfEmployees,
        employees: datumObj.employees || toBeModified.employees,
        country: datumObj.country || toBeModified.country,
        id: id,
    };

    await writeFile(allData);
    return true;
}