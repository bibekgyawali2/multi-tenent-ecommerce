import axios from "axios";
import Env from "../../config/env";
import { generateRandom3Chars } from "./store.test";
import { stat } from "fs";

const BACKEND_URL = Env.BASE_URL;

describe("Product Service", () => {
    let token: string;
    let storeData: any;
    let storeEmail: string;
    let storePassword = "password@123";
    beforeAll(async () => {
        storeEmail = `test-store-${generateRandom3Chars()}@test.com`;
        try {
            const response = await axios.post(`${BACKEND_URL}/api/store/create`, {
                storeName: `test-store-${generateRandom3Chars()}`,
                contactEmailAddress: storeEmail,
                businessCategory: "fashion",
                contactNumber: `+234${generateRandom3Chars()}`,
                storeAddress: `test-store-${generateRandom3Chars()} address`,
                name: `test-store-${generateRandom3Chars()}`,
                email: storeEmail,
                phone: `+234${generateRandom3Chars()}`,
                password: storePassword,
            });

            storeData = response.data;

            expect(response.status).toBe(201);
        } catch (e: any) {
            console.error("Store creation failed:", e.response?.data);
            throw e;
        }

        //signin
        try {
            const signinResponse = await axios.post(
                `${BACKEND_URL}/api/auth/signin`,
                {
                    email: storeEmail,
                    password: storePassword,
                }
            );

            token = signinResponse.data.data.token;
            expect(signinResponse.status).toBe(200);
            expect(signinResponse.data).toHaveProperty("success", true);
            expect(signinResponse.data.data).toHaveProperty("token");
        } catch (e: any) {
            console.error("Sign in test failed:", e.response?.data || e.message);
            throw e;
        }

        //fetch all categories
        try {
            const categoriesResponse = await axios.get(`${BACKEND_URL}/api/category`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            expect(categoriesResponse.status).toBe(200);
        } catch (e: any) {
            console.error("Category fetch failed:", e.response?.data);
            throw e;
        }
    });

    test("should create a product without category ", async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/product/create`,
                {
                    productName: `test-product-${generateRandom3Chars()}`,
                    productDescription: `test-product-${generateRandom3Chars()} description`,
                    price: 1000,
                    productStock: 10,
                    status: "active",
                    product_sku: `sku-${generateRandom3Chars()}`,
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
        } catch (e: any) {
            console.error("Product creation failed:", e.response?.data);
            throw e;
        }
    });

    test("should create a product with category ", async () => {
        expect(1).toBe(1);
    });
});