"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const web_1 = __importDefault(require("./../routes/web"));
const api_1 = __importDefault(require("./../routes/api"));
const app = (0, express_1.default)();
app.use("/", web_1.default);
app.use("/api", api_1.default);
app.listen(config_1.default.port, () => {
    console.log(config_1.default.host);
});
exports.default = app;
