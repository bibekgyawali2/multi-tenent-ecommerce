import { Repository, DeepPartial } from "typeorm";
import AppDataSource from "../config/database.config";
import Order from "../entities/order.entity";
import OrderItem from "../entities/order-item.entity";
import Product from "../entities/products.entity";
import HttpException from "../utils/HttpException";
import { CreateOrderDTO } from "../dtos/order.dto";
import getStoreIdFromUserId from "./utils/getShopIdFromUserId";

class OrderService {
    private orderRepository: Repository<Order>;
    private orderItemRepository: Repository<OrderItem>;
    private productRepository: Repository<Product>;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
        this.orderItemRepository = AppDataSource.getRepository(OrderItem);
        this.productRepository = AppDataSource.getRepository(Product);
    }

    // Create a new order
    async createOrder(orderData: CreateOrderDTO, storeId: string): Promise<Order | null> {
        try {
            // Start a transaction
            return await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
                // Create the order without items first
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
                    store: { id: storeId },
                };

                const order = await transactionalEntityManager.save(Order, orderEntity);

                // Process order items
                const orderItemPromises = orderData.orderItems.map(async (item) => {
                    // Find the product
                    const product = await transactionalEntityManager.findOne(Product, {
                        where: { id: item.productId }
                    });

                    if (!product) {
                        throw HttpException.notFound(`Product with ID ${item.productId} not found`);
                    }

                    // Check if product belongs to the store
                    if (product.store.id !== storeId) {
                        throw HttpException.forbidden(`Product ${item.productId} does not belong to this store`);
                    }

                    // // Check stock availability
                    // if (product.productStock < item.quantity) {
                    //     throw HttpException.badRequest(`Insufficient stock for product ${product.productName}`);
                    // }

                    // Create order item
                    const orderItem = transactionalEntityManager.create(OrderItem, {
                        order,
                        product,
                        quantity: item.quantity
                    });

                    // Update product stock
                    // product.productStock -= item.quantity;
                    await transactionalEntityManager.save(Product, product);

                    return orderItem;
                });

                const orderItems = await Promise.all(orderItemPromises);
                await transactionalEntityManager.save(OrderItem, orderItems);

                // Fetch the complete order with items
                return await transactionalEntityManager.findOne(Order, {
                    where: { id: order.id },
                    relations: ['orderItems', 'orderItems.product']
                });
            });

        } catch (error: any) {
            if (error instanceof HttpException) throw error;
            throw HttpException.badRequest(`Failed to create order: ${error.message}`);
        }
    }

    // Get all orders
    async getAllOrders(storeId: string): Promise<Order[]> {
        try {
            return await this.orderRepository.find({
                where: { store: { id: storeId } },
                relations: ['orderItems', 'orderItems.product'],
                order: { orderDate: 'DESC' }
            });
        } catch (error: any) {
            throw HttpException.internalServerError(`Failed to fetch orders: ${error.message}`);
        }
    }

    // Get an order by ID
    async getOrderById(id: string, storeId: string): Promise<Order> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id, store: { id: storeId } },
                relations: ['orderItems', 'orderItems.product']
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


}

export default OrderService;