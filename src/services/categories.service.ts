import { Repository } from "typeorm";
import AppDataSource from "../config/database.config";
import Category from "../entities/categories.entity";
import HttpException from "../utils/HttpException";
import { Body } from "tsoa";
import { createCategoryDTO } from "../dtos/categories.dto";
import Store from "../entities/store.entity";
import getStoreIdFromUserId from "./getShopIdFromUserId";

class CategoryService {
    private categoryRepository: Repository<Category>;
    private storeRepository: Repository<Store>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.storeRepository = AppDataSource.getRepository(Store);
    }

    async createCategory(@Body() categoryData: createCategoryDTO, userId: string): Promise<Category> {
        const { categoryName, categoryDescription, categoryImage } = categoryData;

        const storeId = await getStoreIdFromUserId.getShopId(userId);

        const store = await this.storeRepository.findOne({
            where: { id: storeId },
        });

        if (!store) {
            throw HttpException.notFound("Store not found");;
        }

        const category = this.categoryRepository.create({
            categoryName,
            categoryDescription,
            categoryImage,
            store,
        });

        return await this.categoryRepository.save(category);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find({
            relations: ["store"],
        });
    }

    async getCategoryById(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ["store"],
        });

        if (!category) {
            throw HttpException.notFound("Category not found");
        }

        return category;
    }

    async updateCategory(id: string, categoryData: Partial<createCategoryDTO>): Promise<Category> {
        const category = await this.getCategoryById(id);

        if (categoryData.categoryName) category.categoryName = categoryData.categoryName;
        if (categoryData.categoryDescription !== undefined) category.categoryDescription = categoryData.categoryDescription;
        if (categoryData.categoryImage) category.categoryImage = categoryData.categoryImage;

        return await this.categoryRepository.save(category);
    }

    async deleteCategory(id: string): Promise<void> {
        const category = await this.getCategoryById(id);

        await this.categoryRepository.remove(category);
    }
}

export default CategoryService;
