"use strict";
// Image processing module
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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../public/config"));
class Image {
    constructor(filename) {
        this.open = (res) => __awaiter(this, void 0, void 0, function* () {
            fs_1.default.readFile(this.filename, function (err, image) {
                if (err) {
                    throw err;
                }
                res.setHeader("Content-Type", "image/jpg");
                res.setHeader("Content-Length", "");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.send(image);
            });
        });
        this.action = ({ width = 0, height = 0, top = 0, left = 0, grayscale = false }) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!fs_1.default.existsSync(config_1.default.srcFiles + this.filename)) {
                    return "404";
                }
                let img = yield (0, sharp_1.default)(config_1.default.srcFiles + this.filename);
                let proccessedFilePath = "";
                let preProccessedFilePath = ""; // to check if file exists before process the image
                if (height > 0 && width > 0) {
                    if (top > 0 || left > 0) {
                        preProccessedFilePath +=
                            width + "x" + height + "-" + left + "x" + top + "-cropped-";
                    }
                    else {
                        preProccessedFilePath += width + "x" + height + "-";
                    }
                }
                if (grayscale) {
                    preProccessedFilePath =
                        config_1.default.savedFiles + "grayscale-" + preProccessedFilePath;
                }
                preProccessedFilePath =
                    config_1.default.savedFiles + preProccessedFilePath + this.filename;
                if (fs_1.default.existsSync(preProccessedFilePath)) {
                    return preProccessedFilePath;
                }
                if (height > 0 && width > 0) {
                    if (top > 0 || left > 0) {
                        proccessedFilePath =
                            proccessedFilePath +
                                width +
                                "x" +
                                height +
                                "-" +
                                left +
                                "x" +
                                top +
                                "-cropped-";
                        img = yield img.extract({ width, height, left, top });
                    }
                    else {
                        // end of crop
                        proccessedFilePath = proccessedFilePath + width + "x" + height + "-";
                        img = yield img.resize({ height, width });
                    } // end of resize
                } // end of crop and resize
                if (grayscale) {
                    proccessedFilePath = "grayscale-" + proccessedFilePath;
                    img = yield img.grayscale();
                } // end of grayscale
                if (proccessedFilePath.length > 0) {
                    proccessedFilePath =
                        config_1.default.savedFiles + proccessedFilePath + this.filename;
                    yield img.toFile(proccessedFilePath);
                    return proccessedFilePath;
                }
                return "404";
            }
            catch (err) {
                return JSON.stringify(err);
            }
        }); // end of action
        this.filename = filename;
    } // end of constructor
}
exports.default = Image;
