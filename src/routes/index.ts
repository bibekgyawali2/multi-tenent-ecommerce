import { Router } from "express";
import messages from "../constants/messages";
import storeRouter from "./store.route";
import { domainConfig } from "../config/domain.config";
import storefrontRouter from "./storefront.route";
import path from "path";
import authRouter from "./auth.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";

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
  }
];

// // Subdomain check middleware
// const subdomainCheck = (req: any, res: any, next: any) => {
//   const hostname = req.hostname;
//   if (hostname === domainConfig.baseDomain) {
//     next();
//   } else {
//     storefrontRouter(req, res, next);
//   }
// };


// router.use(subdomainCheck);


// *Route to ensure that server is currently running
router.get("/", (req, res) => {
  res.send({
    success: true,
    message: messages["welcomeMessage"],
    data: [

    ],
  });
});

routes.forEach((route) => {
  router.use(route.path, route.route());
});



export default router;
