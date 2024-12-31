import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import ProductController from "../controllers/products.controller";
import { CreateProductDTO } from "../dtos/product.dto";
import authMiddleware from "../middlewares/auth.middleware";
import SubdomainResolver from "../middlewares/subDomainResolver.middleware";
import Env from "../config/env";

const productController = new ProductController();
const subdomainResolver = new SubdomainResolver(Env.BASE_DOMAIN);
class ProductRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {

        this.router.get(
            "/",
            subdomainResolver.resolve.bind(subdomainResolver),
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
