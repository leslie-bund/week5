"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const html_metadata_parser_1 = require("html-metadata-parser");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    const urlObject = new URL(req.url, `http://${req.headers.host}`);
    if (req.method === "GET") {
        (async () => {
            var _a, _b;
            var result = await html_metadata_parser_1.parser(`https:/` + urlObject.pathname);
            console.log(JSON.stringify(result, ['og'], 3));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                meta: {
                    title: ((_a = result === null || result === void 0 ? void 0 : result.meta) === null || _a === void 0 ? void 0 : _a.title) || '',
                    description: ((_b = result === null || result === void 0 ? void 0 : result.meta) === null || _b === void 0 ? void 0 : _b.description) || ''
                },
                images: result.images,
            }));
        })();
    }
});
server.listen(3001);
