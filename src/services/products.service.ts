import { Repository } from "typeorm";
import AppDataSource from "../config/database.config";
import Product from "../entities/products.entity";
import Category from "../entities/categories.entity";
import Store from "../entities/store.entity";
import HttpException from "../utils/HttpException";
import { CreateProductDTO } from "../dtos/product.dto";
import getShopIdFromUserId from "./utils/getShopIdFromUserId";

class ProductService {
    private productRepository: Repository<Product>;
    private categoryRepository: Repository<Category>;
    private storeRepository: Repository<Store>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
        this.categoryRepository = AppDataSource.getRepository(Category);
        this.storeRepository = AppDataSource.getRepository(Store);
    }

    async createProduct(productData: CreateProductDTO, userId: string): Promise<Product> {
        const {
            productName,
            productDescription,
            productImage,
            price,
            crossedPrice,
            productStock,
            status,
            product_sku,
            categoryId,
        } = productData;

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) throw HttpException.notFound("Category not found");

        const storeId = await getShopIdFromUserId.getShopId(userId);

        const store = await this.storeRepository.findOne({ where: { id: storeId } });
        if (!store) throw HttpException.notFound("Store not found");

        const product = this.productRepository.create({
            productName,
            productDescription,
            productImage,
            productPrice: price,
            crossedPrice,
            productStock,
            status: status || "active",
            product_sku,
            category,
            store,
        });

        return await this.productRepository.save(product);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ["category", "store"] });
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ["category", "store"],
        });
        if (!product) throw HttpException.notFound("Product not found");
        return product;
    }

    async updateProduct(id: string, productData: Partial<CreateProductDTO>): Promise<Product> {
        const product = await this.getProductById(id);

        if (productData.productName) product.productName = productData.productName;
        if (productData.productDescription !== undefined) product.productDescription = productData.productDescription;
        if (productData.productImage) product.productImage = productData.productImage;
        if (productData.price !== undefined) product.productPrice = productData.price;
        if (productData.crossedPrice !== undefined) product.crossedPrice = productData.crossedPrice;
        if (productData.productStock !== undefined) product.productStock = productData.productStock;
        if (productData.status) product.status = productData.status;
        if (productData.product_sku) product.product_sku = productData.product_sku;

        return await this.productRepository.save(product);
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await this.getProductById(id);
        await this.productRepository.remove(product);
    }
}

export default ProductService;
