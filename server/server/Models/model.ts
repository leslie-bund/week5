import data from './data.json';

export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(data);
    })
}