import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import { SignInDTO } from "../dtos/auth.dto";
import { SignUpDTO } from "../dtos/auth.dto";
import ProductController from "../controllers/products.controller";
import { CreateProductDTO } from "../dtos/product.dto";
import authMiddleware from "../middlewares/auth.middleware";

const productController = new ProductController();

class ProductRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {

        this.router.post(
            "/",
            Validate(SignUpDTO),
            catchAsync(productController.getAllProducts.bind(productController))
        );

        this.router.post(
            "/create",
            authMiddleware.getMiddleware(),
            Validate(CreateProductDTO),
            catchAsync(productController.createProduct.bind(productController))
        );

    };

    static routerInstance() {
        const productRouter = new ProductRoutes();
        return productRouter.router;
    }
}

export default ProductRoutes.routerInstance;
