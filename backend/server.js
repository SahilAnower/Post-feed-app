import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";
import authorizationMiddleware from "./middlewares/authorization.middleware.js";

import dotenv from "dotenv";

dotenv.config();

import { routes } from "./controllers/main.controller.js";

const port = process.env.PORT || 5000;
// console.log(process.env.PORT);

const app = express();

// require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use(authorizationMiddleware);

// authorization

routes(app, express);

app.use(errorHandlerMiddleware);

// error-handler

app.listen(port, async () => {
  console.log("listening to port: ", port || 5000);
});
