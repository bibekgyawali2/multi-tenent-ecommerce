import express, { Application } from "express";
import errorHandler from "./error.middleware";
import morganMiddleware from "./morgan.middleware";
import routes from "../routes/index";
import compression from "compression";
import cors from "cors";

const middlewares = (app: Application) => {
  app.use(compression());

  app.use(cors());

  app.use(express.json());


  app.use(morganMiddleware);

  app.use(express.static("public/uploads"));

  app.use("/api", routes);


  app.use(errorHandler);
};

export default middlewares;
