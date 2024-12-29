import { Repository, DeepPartial } from "typeorm";
import AppDataSource from "../config/database.config";
import Order from "../entities/order.entity";
import HttpException from "../utils/HttpException";
import { CreateOrderDTO } from "../dtos/order.dto";
import getStoreIdFromUserId from "./utils/getShopIdFromUserId";

class OrderService {
    private orderRepository: Repository<Order>;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    // Create a new order
    async createOrder(orderData: CreateOrderDTO): Promise<Order> {


        // Convert DTO to entity-compatible format
        const orderEntity: DeepPartial<Order> = {
            orderDate: orderData.orderDate,
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            shippingAddress: orderData.shippingAddress,
            shippingCity: orderData.shippingCity,
            shippingRegion: orderData.shippingRegion,
            shippingCountry: orderData.shippingCountry,
            shippingPostalCode: orderData.shippingPostalCode,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: orderData.paymentStatus,
            paymentDate: orderData.paymentDate ? new Date(orderData.paymentDate) : undefined,
            paymentAmount: typeof orderData.paymentAmount === 'string' ?
                parseFloat(orderData.paymentAmount) :
                orderData.paymentAmount,
            orderItems: orderData.orderItems,
            store: { id: orderData.storeId },
        };

        try {
            const order = this.orderRepository.create(orderEntity);
            return await this.orderRepository.save(order);
        } catch (error: any) {
            throw HttpException.badRequest(`Failed to create order: ${error.message}`);
        }
    }

    // Get all orders
    async getAllOrders(): Promise<Order[]> {
        try {
            return await this.orderRepository.find();
        } catch (error: any) {
            throw HttpException.internalServerError(`Failed to fetch orders: ${error.message}`);
        }
    }

    // Get an order by ID
    async getOrderById(id: string): Promise<Order> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id },
            });

            if (!order) {
                throw HttpException.notFound("Order not found");
            }

            return order;
        } catch (error: any) {
            if (error instanceof HttpException) throw error;
            throw HttpException.internalServerError(`Failed to fetch order: ${error.message}`);
        }
    }

    // Delete an order
    async deleteOrder(id: string): Promise<void> {
        try {
            const order = await this.getOrderById(id);
            await this.orderRepository.remove(order);
        } catch (error: any) {
            if (error instanceof HttpException) throw error;
            throw HttpException.badRequest(`Failed to delete order: ${error.message}`);
        }
    }
}

export default OrderService;