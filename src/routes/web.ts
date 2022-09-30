import express from "express";
import fs from "fs";
import config from "../public/config";

const web = express.Router();

web.get("/", (req: express.Request, res: express.Response) => {
  try {
    let html = "<ul>";
    fs.readdirSync(config.srcFiles).forEach((file) => {
      html += `<li>
        <a href="${config.host + "api/img/?filename=" + file}">${file}</a>
      </li>`;
    });
    html += "</ul>";
    res.send(
      `
      <center><h1>Image manipulation</h1></center>` + html
    );
  } catch (err) {
    res.send("Directory path error ( look into config.ts file )");
  }
}); // end of root

export default web;
