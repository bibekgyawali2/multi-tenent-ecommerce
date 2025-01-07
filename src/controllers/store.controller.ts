import StoreService from "../services/store.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import messages from "../constants/messages";
import AuthService from "../services/auth.service";

class StoreController {
    constructor(
        private storeService: StoreService = new StoreService(),
        private authService: AuthService = new AuthService(),
    ) { }

    async createStore(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const store = await this.storeService.createStore(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: messages["actionCompleted"],

                data: {
                    store,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}

export default StoreController;
