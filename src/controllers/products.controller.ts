import ProductService from "../services/products.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import messages from "../constants/messages";
import { uploadSingle } from "../middlewares/upload.middleware";
import HttpException from "../utils/HttpException";

class ProductController {
    constructor(private productService: ProductService = new ProductService()) { }

    uploadProductImage = uploadSingle('productImage');

    // Create a new product
    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(`FIle: ${req.file}`)
        try {
            if (!req.file) {
                throw HttpException.badRequest("Product image is required");
            }
            const productData = {
                ...req.body,
                productImage: `/uploads/${req.file.filename}`
            };
            const product = await this.productService.createProduct(productData, req.user.id);
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
            const products = await this.productService.getProductsByStore(req.storeId!);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { products },
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllProductAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.productService.getProductsByStore(req.params.storeId!);
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

    // // Update a product
    // async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const product = await this.productService.updateProduct(id, req.body);
    //         res.status(StatusCodes.SUCCESS).json({
    //             success: true,
    //             message: messages["actionCompleted"],
    //             data: { product },
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

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
