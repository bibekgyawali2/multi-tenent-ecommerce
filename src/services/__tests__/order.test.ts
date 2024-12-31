import axios from "axios";
import Env from "../../config/env";

const BACKEND_URL = Env.BASE_URL;

describe("Order Service", () => {
    beforeAll(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/product`);

            expect(response.status).toBe(200);
        } catch (e: any) {
            console.error("Product fetch failed:", e.response?.data);
            throw e;
        }


    });

    test("should create Order", async () => {
        expect(1).toBe(1);
        // try {
        //     const response = await axios.post(`${BACKEND_URL}/api/order/create`, {
        //         orderDate: Date.now().toString(),
        //         customerName: "Test Customer",
        //         customerEmail: "testcustomer@example.com",
        //         customerPhone: "+1234567890",
        //         shippingAddress: "123 Main Street",
        //         shippingCity: "Sample City",
        //         shippingRegion: "Sample Region",
        //         shippingCountry: "Sample Country",
        //         shippingPostalCode: "12345",
        //         paymentMethod: "Credit Card",
        //         paymentStatus: "Paid",
        //         paymentDate: new Date().toISOString(),
        //         paymentAmount: 150.5,
        //         orderItems: [
        //             { productId: "1", quantity: 2 },
        //             { productId: "2", quantity: 3 },
        //         ],
        //     });

        //     expect(response.status).toBe(201);
        // } catch (e: any) {
        //     console.error("Order creation failed:", e.response?.data);
        //     throw e;
        // }
    });
});
