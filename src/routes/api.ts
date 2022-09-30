import express from "express";
import fs from "fs";
import config from "../public/config";
import Image from "../utilities/image";
import ImageInterface from "../utilities/imageInterface";

const api = express.Router();

api.get("/img", async (req: express.Request, res: express.Response) => {
  try {
    const filename = req.query["filename"] as string;

    if (!filename) {
      return res.send("Filename parameter is required");
    }

    if (!fs.existsSync(config.srcFiles + filename)) {
      return res.send("404");
    }

    const queryParams = {
      width: req.query["width"] as string,
      height: req.query["height"] as string,
      top: req.query["top"] as string,
      left: req.query["left"] as string,
      grayscale: req.query["grayscale"] as string
    };

    const params: ImageInterface = {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      grayscale: false
    };

    if (
      !isNaN(parseInt(queryParams.height)) &&
      !isNaN(parseInt(queryParams.width))
    ) {
      params.width = parseInt(req.query["width"] as string);
      params.height = parseInt(req.query["height"] as string);

      if (!isNaN(parseInt(queryParams.top))) {
        params.top = parseInt(req.query["top"] as string);
      }

      if (!isNaN(parseInt(queryParams.left))) {
        params.left = parseInt(req.query["left"] as string);
      }
    }

    params.grayscale = queryParams.grayscale !== undefined ? true : false;

    if (
      Object.keys(req.query).length === 1 ||
      ((params.width == 0 || params.height == 0) && !params.grayscale)
    ) {
      return new Image(config.srcFiles + filename).open(res);
    }

    new Image(filename).action(params).then((out) => {
      new Image(out.toString()).open(res);
    });
  } catch (err) {
    return res.send("error:" + JSON.stringify(err));
  }
});

export default api;
