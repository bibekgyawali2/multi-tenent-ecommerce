import { Router } from "express";
import { subdomainMiddleware } from "../middlewares/subdomain.middleware";
import { add } from "winston";
import { create } from "domain";

const storefrontRouter = Router();

storefrontRouter.use(subdomainMiddleware);

storefrontRouter.get("/", (req, res) => {
    const store = (req as any).store;
    res.send({
        success: true,
        data: {
            storeName: store.storeName,
            businessCategory: store.businessCategory,
            contactNumber: store.contactNumber,
            address: store.storeAddress,
            email: store.contactEmailAddress,
            subdomain: store.subdomain,
            createdAt: store.createdAt,
        },
    });
});

export default storefrontRouter;