import express from "express";
import config from "./config";
import web from "./../routes/web";
import api from "./../routes/api";

const app = express();

app.use("/", web);

app.use("/api", api);

app.listen(config.port, () => {
  console.log(config.host);
});

export default app;
