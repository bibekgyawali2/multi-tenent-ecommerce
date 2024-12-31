import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import { createCategoryDTO } from "../dtos/categories.dto";
import CategoryController from "../controllers/categories.controller";
import SubdomainResolver from "../middlewares/subDomainResolver.middleware";
import Env from "../config/env";

const categoryController = new CategoryController();
const subdomainResolver = new SubdomainResolver(Env.BASE_DOMAIN);

class CategoryRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get(
            "/",
            subdomainResolver.resolve.bind(subdomainResolver),
            catchAsync(categoryController.getCategoriesByStore.bind(categoryController))
        );

        this.router.post(
            "/create",
            authMiddleware.getMiddleware(),
            Validate(createCategoryDTO),
            catchAsync(categoryController.createCategory.bind(categoryController))
        );
    };

    static routerInstance() {
        const categoryRouter = new CategoryRoutes();
        return categoryRouter.router;
    }
}

export default CategoryRoutes.routerInstance;