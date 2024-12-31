import axios from "axios";
import Env from "../../config/env";
import { generateRandom3Chars } from "./store.test";

const BACKEND_URL = Env.BASE_URL;

describe("E2E Service Tests", () => {
    let token: string;
    let storeData: any;
    let categoryId: string;
    let storeCreated = false;


    const randomChars = generateRandom3Chars();
    const storeEmail = `test-store-${randomChars}@test.com`;
    const storeName = `test-store-${randomChars}`;
    const storeContactNumber = `+234${randomChars}`;
    const storePassword = "password@123";

    beforeAll(() => {
        console.log("Starting E2E Tests...");
    });

    afterAll(() => {
        console.log("E2E Tests Completed.");
    });

    describe("Store and Auth Flow", () => {
        test("should create a store", async () => {
            if (storeCreated) return;  // Skip store creation if it's already done

            try {
                const response = await axios.post(`${BACKEND_URL}/api/store/create`, {
                    storeName,
                    contactEmailAddress: storeEmail,
                    businessCategory: "fashion",
                    contactNumber: storeContactNumber,
                    storeAddress: `test-store-${randomChars} address`,
                    name: storeName,
                    email: storeEmail,
                    phone: storeContactNumber,
                    password: storePassword,
                });

                storeData = response.data;
                expect(response.status).toBe(201);
                expect(response.data).toHaveProperty("success", true);
                expect(response.data.data).toHaveProperty("store");
                storeCreated = true;
            } catch (e: any) {
                console.error("Store creation failed:", e.response?.data);
                throw e;
            }
        });

        test("should sign in with store credentials", async () => {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
                    email: storeEmail,
                    password: storePassword,
                });

                token = response.data.data.token;
                expect(response.status).toBe(200);
                expect(response.data).toHaveProperty("success", true);
                expect(response.data.data).toHaveProperty("token");
            } catch (e: any) {
                console.error("Sign in failed:", e.response?.data);
                throw e;
            }
        });
    });

    describe("Category Flow", () => {
        test("should create a category", async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/api/category/create`,
                    {
                        categoryName: `test-category-${randomChars}`,
                        categoryDescription: `test-category-${randomChars} description`,
                        categoryImage: `https://via.placeholder.com/150`,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                categoryId = response.data.data.category.id;
                expect(response.status).toBe(201);
                expect(response.data).toHaveProperty("success", true);
                expect(response.data.data).toHaveProperty("category");
            } catch (e: any) {
                console.error("Category creation failed:", e.response?.data);
                throw e;
            }
        });
    });

    describe("Product Flow", () => {
        test("should create a product without category", async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/api/product/create`,
                    {
                        productName: `test-product-${randomChars}`,
                        productDescription: `test-product-${randomChars} description`,
                        price: 1000,
                        productStock: 10,
                        status: "active",
                        product_sku: `sku-${randomChars}`,
                        crossedPrice: 1200,
                        productImage: "https://via.placeholder.com/150",
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                expect(response.status).toBe(201);
                expect(response.data).toHaveProperty("success", true);
                expect(response.data.data).toHaveProperty("product");
            } catch (e: any) {
                console.error("Product creation failed:", e.response?.data);
                throw e;
            }
        });

        test("should create a product with category", async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/api/product/create`,
                    {
                        productName: `test-product-${randomChars}`,
                        productDescription: `test-product-${randomChars} description`,
                        price: 1000,
                        productStock: 10,
                        status: "active",
                        product_sku: `sku-${randomChars}`,
                        crossedPrice: 1200,
                        productImage: "https://via.placeholder.com/150",
                        categoryId: categoryId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                expect(response.status).toBe(201);
                expect(response.data).toHaveProperty("success", true);
                expect(response.data.data.product.category.id).toBe(categoryId);
            } catch (e: any) {
                console.error("Product creation with category failed:", e.response?.data);
                throw e;
            }
        });
    });
});
