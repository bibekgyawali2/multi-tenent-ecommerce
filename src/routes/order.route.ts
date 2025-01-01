import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import { CreateOrderDTO } from "../dtos/order.dto";
import OrderController from "../controllers/order.controller";
import SubdomainResolver from "../middlewares/subDomainResolver.middleware";
import Env from "../config/env";

const orderController = new OrderController();
const subdomainResolver = new SubdomainResolver(Env.BASE_DOMAIN);
class OrderRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {

        this.router.get(
            "/",
            subdomainResolver.resolve.bind(subdomainResolver),
            catchAsync(orderController.getAllOrders.bind(orderController))
        );

        this.router.post(
            "/create",
            Validate(CreateOrderDTO),
            subdomainResolver.resolve.bind(subdomainResolver),
            catchAsync(orderController.createOrder.bind(orderController))
        );

    };

    static routerInstance() {
        const productRouter = new OrderRoutes();
        return productRouter.router;
    }
}

export default OrderRoutes.routerInstance;
