import express, { Application } from "express";
import errorHandler from "./error.middleware";
import morganMiddleware from "./morgan.middleware";
import routes from "../routes/index";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";


const middlewares = (app: Application) => {
  app.use(compression());

  app.use(cors());

  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morganMiddleware);

  app.use('/uploads', express.static("public/uploads"));

  app.use("/api", routes);


  app.use(errorHandler);
};

export default middlewares;
