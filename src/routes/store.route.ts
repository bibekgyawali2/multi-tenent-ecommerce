import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import Validate from "../middlewares/validation.middleware";
import { createStoreDTO } from "../dtos/store.dto";
import StoreController from "../controllers/store.controller";

const storeController = new StoreController();

class StoreRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.post(
            "/create",
            Validate(createStoreDTO),
            catchAsync(storeController.createStore.bind(storeController))
        );
    };
    static routerInstance() {
        const storeRouter = new StoreRoutes();
        return storeRouter.router;
    }
}

export default StoreRoutes.routerInstance;