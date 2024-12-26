import ProductService from "../services/products.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import messages from "../constants/messages";

class ProductController {
    constructor(private productService: ProductService = new ProductService()) { }

    // Create a new product
    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: messages["actionCompleted"],
                data: { product },
            });
        } catch (error) {
            next(error);
        }
    }

    // Get all products
    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.productService.getAllProducts();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { products },
            });
        } catch (error) {
            next(error);
        }
    }

    // Get product by ID
    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { product },
            });
        } catch (error) {
            next(error);
        }
    }

    // Update a product
    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.updateProduct(id, req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { product },
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete a product
    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;
