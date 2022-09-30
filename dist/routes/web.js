"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../public/config"));
const web = express_1.default.Router();
web.get("/", (req, res) => {
    try {
        let html = "<ul>";
        fs_1.default.readdirSync(config_1.default.srcFiles).forEach((file) => {
            html += `<li>
        <a href="${config_1.default.host + "api/img/?filename=" + file}">${file}</a>
      </li>`;
        });
        html += "</ul>";
        res.send(`
      <center><h1>Image manipulation</h1></center>` + html);
    }
    catch (err) {
        res.send("Directory path error ( look into config.ts file )");
    }
}); // end of root
exports.default = web;
