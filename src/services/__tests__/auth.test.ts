import axios from "axios";
import Env from "../../config/env";
import { generateRandom3Chars } from "./store.test";

const BACKEND_URL = Env.BASE_URL;

describe("Auth Service", () => {
    let storeData: any;
    let storeEmail: string;
    let storePassword = "password@123";
    let token: string;
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
            console

            expect(response.status).toBe(201);
        } catch (e: any) {
            console.error('Store creation failed:', e.response?.data);
            throw e;
        }
    });

    test("should sign in with store email", async () => {
        try {
            const signinResponse = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
                email: storeEmail,
                password: storePassword,
            });

            token = signinResponse.data.data.token;
            console.log("Token:", token);
            console.log("Sign in response:", signinResponse.data);
            expect(signinResponse.status).toBe(200);
            expect(signinResponse.data).toHaveProperty("success", true);
            expect(signinResponse.data.data).toHaveProperty("token");
        } catch (e: any) {
            console.error("Sign in test failed:", e.response?.data || e.message);
            throw e;
        }
    });

    test("should sign up a new user", async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/auth/signup`,
                {
                    name: `test-user-${generateRandom3Chars()}`,
                    email: `test-user-${generateRandom3Chars()}@test.com`,
                    phone: `+234${generateRandom3Chars()}`,
                    password: "password@123",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Sign up response:", response.status);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data.data).toHaveProperty("user");
        } catch (e: any) {
            console.error("Sign up test failed:", e.response?.data || e.message);
            throw e;
        }
    });
});