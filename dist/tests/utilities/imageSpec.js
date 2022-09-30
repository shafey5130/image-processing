"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("../../utilities/image"));
const config_1 = __importDefault(require("../../public/config"));
describe("Image module test", () => {
    const file = "fjord.jpg";
    let outputFile = config_1.default.savedFiles;
    it("Check if image is exists", () => {
        new image_1.default(file + "dd")
            .action({
            width: 513,
            height: 513
        })
            .then((res) => {
            expect(res).toBe("404");
        });
    }); // Check if image is exists
    describe("Functionality", () => {
        it("resize", () => {
            outputFile = config_1.default.savedFiles + 513 + "x" + 513 + "-" + file;
            new image_1.default(file)
                .action({
                width: 513,
                height: 513
            })
                .then((res) => {
                expect(res).toBe(outputFile);
            });
        }); // end of resize
        it("grayscale", () => {
            outputFile = config_1.default.savedFiles + "grayscale-" + file;
            new image_1.default(file)
                .action({
                grayscale: true
            })
                .then((res) => {
                expect(res).toBe(outputFile);
            });
        }); // end of grayscale
        it("cropped", () => {
            outputFile =
                config_1.default.savedFiles +
                    513 +
                    "x" +
                    513 +
                    "-" +
                    102 +
                    "x" +
                    100 +
                    "-cropped-" +
                    file;
            new image_1.default(file)
                .action({
                width: 513,
                height: 513,
                top: 100,
                left: 102
            })
                .then((res) => {
                expect(res).toBe(outputFile);
            });
        }); // end of cropped
    }); // end of functionality
}); // Image module test
