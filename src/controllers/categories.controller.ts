import CategoryService from "../services/categories.service";
import { StatusCodes } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import messages from "../constants/messages";

class CategoryController {
    constructor(
        private categoryService: CategoryService = new CategoryService(),
    ) { }

    async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const category = await this.categoryService.createCategory(req.body, req.user.id);
            res.status(StatusCodes.CREATED).json({
                success: true,
                message: messages["actionCompleted"],
                data: { category },
            });
        } catch (error) {
            next(error);
        }
    }

    async getCategoriesByStore(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this.categoryService.getCategoriesByStoreId(req.storeId!);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { categories },
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { categories },
            });
        } catch (error) {
            next(error);
        }
    }

    async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const category = await this.categoryService.getCategoryById(id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { category },
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const category = await this.categoryService.updateCategory(id, req.body);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
                data: { category },
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await this.categoryService.deleteCategory(id);
            res.status(StatusCodes.SUCCESS).json({
                success: true,
                message: messages["actionCompleted"],
            });
        } catch (error) {
            next(error);
        }
    }
}

export default CategoryController;
