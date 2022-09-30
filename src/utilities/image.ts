// Image processing module

import express from "express";
import sharp from "sharp";
import fs from "fs";
import config from "../public/config";

class Image {
  filename;

  constructor(filename: string) {
    this.filename = filename;
  } // end of constructor

  open = async (res: express.Response): Promise<void> => {
    fs.readFile(this.filename, function (err, image): void {
      if (err) {
        throw err;
      }
      res.setHeader("Content-Type", "image/jpg");
      res.setHeader("Content-Length", "");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(image);
    });
  };

  action = async ({
    width = 0,
    height = 0,
    top = 0,
    left = 0,
    grayscale = false
  }): Promise<string> => {
    try {
      if (!fs.existsSync(config.srcFiles + this.filename)) {
        return "404";
      }

      let img = await sharp(config.srcFiles + this.filename);
      let proccessedFilePath = "";
      let preProccessedFilePath = ""; // to check if file exists before process the image

      if (height > 0 && width > 0) {
        if (top > 0 || left > 0) {
          preProccessedFilePath +=
            width + "x" + height + "-" + left + "x" + top + "-cropped-";
        } else {
          preProccessedFilePath += width + "x" + height + "-";
        }
      }

      if (grayscale) {
        preProccessedFilePath =
          config.savedFiles + "grayscale-" + preProccessedFilePath;
      }

      preProccessedFilePath =
        config.savedFiles + preProccessedFilePath + this.filename;

      if (fs.existsSync(preProccessedFilePath)) {
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
          img = await img.extract({ width, height, left, top });
        } else {
          // end of crop
          proccessedFilePath = proccessedFilePath + width + "x" + height + "-";
          img = await img.resize({ height, width });
        } // end of resize
      } // end of crop and resize

      if (grayscale) {
        proccessedFilePath = "grayscale-" + proccessedFilePath;
        img = await img.grayscale();
      } // end of grayscale

      if (proccessedFilePath.length > 0) {
        proccessedFilePath =
          config.savedFiles + proccessedFilePath + this.filename;
        await img.toFile(proccessedFilePath);
        return proccessedFilePath;
      }
      return "404";
    } catch (err) {
      return JSON.stringify(err);
    }
  }; // end of action
}

export default Image;
