// src/services/__tests__/product.test.ts
import axios from "axios";
import Env from "../../config/env";
import { generateRandom3Chars } from "./store.test";
import path from 'path';
import fs from 'fs';
import FormData from 'form-data';

const BACKEND_URL = Env.BASE_URL;

// Utility function to create a test image file
const createTestImage = async () => {
    const testImagePath = path.join(__dirname, 'test-image.jpg');

    // Create a small test image if it doesn't exist
    if (!fs.existsSync(testImagePath)) {
        // Create a 1x1 pixel JPEG file
        const imageData = Buffer.from([
            0xff, 0xd8, // JPEG Start of Image
            0xff, 0xe0, // APP0 marker
            0x00, 0x10, // Length of APP0 segment
            0x4a, 0x46, 0x49, 0x46, 0x00, // JFIF identifier
            0x01, 0x01, // JFIF version
            0x00, // Units (0 = none)
            0x00, 0x01, // X density
            0x00, 0x01, // Y density
            0x00, 0x00, // Thumbnail size
            0xff, 0xdb, // DQT marker
            0x00, 0x43, // Length of DQT segment
            0x00, // QT information
            ...new Array(64).fill(0x80), // QT values
            0xff, 0xc0, // SOF marker
            0x00, 0x0b, // Length of SOF segment
            0x08, // Precision
            0x00, 0x01, // Height
            0x00, 0x01, // Width
            0x01, // Number of components
            0x01, 0x11, 0x00, // Component information
            0xff, 0xda, // SOS marker
            0x00, 0x08, // Length of SOS segment
            0x01, // Number of components
            0x01, 0x00, // Component information
            0x00, 0x3f, 0x00, // Other SOS parameters
            0xff, 0xd9 // EOI marker
        ]);

        await fs.promises.writeFile(testImagePath, imageData);
    }

    return testImagePath;
};

describe("Product Service", () => {
    let token: string;
    let storeData: any;
    let storeEmail: string;
    let storePassword = "password@123";
    let testImagePath: string;

    beforeAll(async () => {
        // Create test image
        testImagePath = await createTestImage();

        // Your existing setup code...
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

        // Sign in code remains the same...
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
    });

    afterAll(async () => {
        // Clean up test image
        if (fs.existsSync(testImagePath)) {
            await fs.promises.unlink(testImagePath);
        }
    });

    test("should create a product with real image file", async () => {
        try {
            const formData = new FormData();

            // Append the image file
            formData.append('productImage', fs.createReadStream(testImagePath), {
                filename: 'test-image.jpg',
                contentType: 'image/jpeg'
            });

            // Append other product data
            formData.append('productName', `test-product-${generateRandom3Chars()}`);
            formData.append('productDescription', `test-product-${generateRandom3Chars()} description`);
            formData.append('price', '1000');
            formData.append('productStock', '10');
            formData.append('status', 'active');
            formData.append('product_sku', `sku-${generateRandom3Chars()}`);
            formData.append('crossedPrice', '1200');

            const response = await axios.post(
                `${BACKEND_URL}/api/product`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            expect(response.status).toBe(201);
            expect(response.data.data.product).toHaveProperty('productImage');
            expect(response.data.data.product.productImage).toMatch(/^\/uploads\//);

            // Verify the image is accessible
            const imageResponse = await axios.get(
                `${BACKEND_URL}${response.data.data.product.productImage}`,
                { responseType: 'arraybuffer' }
            );
            expect(imageResponse.status).toBe(200);
            expect(imageResponse.headers['content-type']).toMatch(/^image\//);
        } catch (e: any) {
            console.error("Product creation failed:", e.response?.data);
            throw e;
        }
    });

    test("should update a product with new image", async () => {
        try {
            // First create a product
            const formData = new FormData();
            formData.append('productImage', fs.createReadStream(testImagePath));
            formData.append('productName', `test-product-${generateRandom3Chars()}`);
            formData.append('price', '1000');
            formData.append('productStock', '10');

            const createResponse = await axios.post(
                `${BACKEND_URL}/api/product`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const productId = createResponse.data.data.product.id;

            // Then update the product with a new image
            const updateFormData = new FormData();
            updateFormData.append('productImage', fs.createReadStream(testImagePath));
            updateFormData.append('productName', `updated-product-${generateRandom3Chars()}`);

            const updateResponse = await axios.put(
                `${BACKEND_URL}/api/product/${productId}`,
                updateFormData,
                {
                    headers: {
                        ...updateFormData.getHeaders(),
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            expect(updateResponse.status).toBe(200);
            expect(updateResponse.data.data.product.productName).toMatch(/^updated-product-/);
            expect(updateResponse.data.data.product.productImage).toMatch(/^\/uploads\//);
        } catch (e: any) {
            console.error("Product update failed:", e.response?.data);
            throw e;
        }
    });
});