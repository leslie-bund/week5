import path from 'path';
import fs from 'fs/promises';

// Dynamically get the contents stored in data.json
const dbFilePath = path.resolve(__dirname, 'data.json');
const rawData = (async function getFileContent() {
    try {
        const content = await fs.readFile(dbFilePath, {encoding: 'utf8'});
        return content;
    } catch (error) {
        const firstContent = JSON.stringify([]);
        await fs.writeFile(dbFilePath, firstContent);
        const content = await fs.readFile(dbFilePath, {encoding: 'utf8'});
        return content;
    }
})();
const data = (async () => JSON.parse(await rawData))();

export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}