"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const srcFiles = __dirname + "/../../assets/src/";
const savedFiles = __dirname + "/../../assets/saved/";
const port = 8080;
const host = "http://localhost:" + port + "/";
exports.default = {
    srcFiles,
    savedFiles,
    host,
    port
};
