// import data from './data.json';
import path from 'path';
import fs from 'fs/promises';

const dbFilePath = path.resolve(__dirname, 'data.json');
const data = (async function getFileContent() {
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


export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}