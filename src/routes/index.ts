import { Router } from "express";
import messages from "../constants/messages";
import storeRouter from "./store.route";
import authRouter from "./auth.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";
import orderRouter from "./order.route";

const router = Router();
const routes = [
  {
    path: "/store",
    route: storeRouter
  },
  {
    path: "/auth",
    route: authRouter
  },
  {
    path: "/category",
    route: categoryRouter
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
];

router.get("/", (req, res) => {
  res.send({
    success: true,
    message: messages["welcomeMessage"],
    data: [],
    routes: [
      routes.map(route => route.path),
    ],
  });
});

routes.forEach((route) => {
  router.use(route.path, route.route());
});



export default router;
