"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../public/config"));
const image_1 = __importDefault(require("../utilities/image"));
const api = express_1.default.Router();
api.get("/img", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.query["filename"];
        if (!filename) {
            return res.send("Filename parameter is required");
        }
        if (!fs_1.default.existsSync(config_1.default.srcFiles + filename)) {
            return res.send("404");
        }
        const queryParams = {
            width: req.query["width"],
            height: req.query["height"],
            top: req.query["top"],
            left: req.query["left"],
            grayscale: req.query["grayscale"]
        };
        const params = {
            width: 0,
            height: 0,
            left: 0,
            top: 0,
            grayscale: false
        };
        if (!isNaN(parseInt(queryParams.height)) &&
            !isNaN(parseInt(queryParams.width))) {
            params.width = parseInt(req.query["width"]);
            params.height = parseInt(req.query["height"]);
            if (!isNaN(parseInt(queryParams.top))) {
                params.top = parseInt(req.query["top"]);
            }
            if (!isNaN(parseInt(queryParams.left))) {
                params.left = parseInt(req.query["left"]);
            }
        }
        params.grayscale = queryParams.grayscale !== undefined ? true : false;
        if (Object.keys(req.query).length === 1 ||
            ((params.width == 0 || params.height == 0) && !params.grayscale)) {
            return new image_1.default(config_1.default.srcFiles + filename).open(res);
        }
        new image_1.default(filename).action(params).then((out) => {
            new image_1.default(out.toString()).open(res);
        });
    }
    catch (err) {
        return res.send("error:" + JSON.stringify(err));
    }
}));
exports.default = api;
