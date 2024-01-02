import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { routes } from "./controllers/main.controller";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// authorization

routes(app, express);

// error-handler

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("listening to port: ", port || 5000);
});
