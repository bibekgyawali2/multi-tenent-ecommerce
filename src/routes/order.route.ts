import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import { SignUpDTO } from "../dtos/auth.dto";
import authMiddleware from "../middlewares/auth.middleware";
import { CreateOrderDTO } from "../dtos/order.dto";
import OrderController from "../controllers/order.controller";

const orderController = new OrderController();

class OrderRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {

        this.router.post(
            "/",
            catchAsync(orderController.getAllOrders.bind(orderController))
        );

        this.router.post(
            "/create",
            Validate(CreateOrderDTO),
            catchAsync(orderController.createOrder.bind(orderController))
        );

    };

    static routerInstance() {
        const productRouter = new OrderRoutes();
        return productRouter.router;
    }
}

export default OrderRoutes.routerInstance;
