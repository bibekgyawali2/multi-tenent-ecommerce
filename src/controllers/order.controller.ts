import OrderService from "../services/order.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import messages from "../constants/messages";

class OrderController {
    constructor(
        private orderService: OrderService = new OrderService(),
    ) { }

    async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const order = await this.orderService.createOrder(req.body, req.storeId!);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: messages["actionCompleted"],
                data: { order },
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orders = await this.orderService.getAllOrders(req.storeId!);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { orders },
            });
        } catch (error) {
            next(error);
        }
    }

    // async getOrderById(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const order = await this.orderService.getOrderById(id);
    //         res.status(StatusCodes.SUCCESS).json({
    //             success: true,
    //             message: messages["actionCompleted"],
    //             data: { order },
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const order = await this.orderService.updateOrder(id, req.body);
    //         res.status(StatusCodes.SUCCESS).json({
    //             success: true,
    //             message: messages["actionCompleted"],
    //             data: { order },
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         await this.orderService.deleteOrder(id);
    //         res.status(StatusCodes.SUCCESS).json({
    //             success: true,
    //             message: messages["actionCompleted"],
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}

export default OrderController;
