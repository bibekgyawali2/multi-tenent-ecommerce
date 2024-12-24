import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

const generateRandom3Chars = () => {
    return Math.random().toString(36).substring(2, 5);
};

describe("Store Service", () => {
    test("should create a store", async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/store/create`, {
                storeName: `test-store-${generateRandom3Chars()}`,
                contactEmailAddress: `test-store-${generateRandom3Chars()}@test.com`,
                businessCategory: "fashion",
                contactNumber: `+234${generateRandom3Chars()}`,
                storeAddress: `test-store-${generateRandom3Chars()} address`,
                name: `test-store-${generateRandom3Chars()}`,
                email: `test-store-${generateRandom3Chars()}@test.com`,
                phone: `+234${generateRandom3Chars()}`,
                password: "password@123",

            });

            console.log(response.data);
            expect(response.status).toBe(201);
        } catch (e: any) {
            console.error('Test failed:', e.response?.data);
            throw e;
        }
    });
});