import { NextFunction, Request, Response } from "express";
import AppDataSource from "../config/database.config";
import Store from "../entities/store.entity";
import HttpException from "../utils/HttpException";

class SubdomainResolver {
    private baseDomain: string;

    constructor(baseDomain: string) {
        this.baseDomain = baseDomain;
    }

    async resolve(req: Request, res: Response, next: NextFunction): Promise<void> {
        const hostname = req.hostname;
        const subdomain = hostname.split(`.${this.baseDomain}`)[0];

        if (!subdomain || subdomain === hostname) {
            console.log(subdomain, hostname);
            return next(new HttpException("Invalid subdomain", 400));
        }

        try {
            const storeRepository = AppDataSource.getRepository(Store);
            const store = await storeRepository.findOne({ where: { subdomain } });

            if (!store) {
                return next(new HttpException("Store not found", 404));
            }

            req.storeId = store.id;
            next();
        } catch (error) {
            next(error);
        }
    }
}

export default SubdomainResolver;
