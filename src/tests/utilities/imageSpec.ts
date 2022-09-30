import Image from "../../utilities/image";
import config from "../../public/config";

describe("Image module test", () => {
  const file = "fjord.jpg";
  let outputFile = config.savedFiles;
  it("Check if image is exists", () => {
    new Image(file + "dd")
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
      outputFile = config.savedFiles + 513 + "x" + 513 + "-" + file;
      new Image(file)
        .action({
          width: 513,
          height: 513
        })
        .then((res) => {
          expect(res).toBe(outputFile);
        });
    }); // end of resize
    it("grayscale", () => {
      outputFile = config.savedFiles + "grayscale-" + file;
      new Image(file)
        .action({
          grayscale: true
        })
        .then((res) => {
          expect(res).toBe(outputFile);
        });
    }); // end of grayscale
    it("cropped", () => {
      outputFile =
        config.savedFiles +
        513 +
        "x" +
        513 +
        "-" +
        102 +
        "x" +
        100 +
        "-cropped-" +
        file;
      new Image(file)
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
