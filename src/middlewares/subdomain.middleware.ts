// src/middlewares/subdomain.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { domainConfig } from '../config/domain.config';
import AppDataSource from "../config/database.config";
import Store from "../entities/store.entity";

export const subdomainMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const hostname = req.hostname;

    if (hostname === domainConfig.baseDomain) {
        return next();
    }
    // Extract subdomain
    const subdomain = hostname.replace(`.${domainConfig.baseDomain}`, '');
    if (subdomain) {
        try {
            const storeRepository = AppDataSource.getRepository(Store);
            const store = await storeRepository.findOne({
                where: { subdomain },
            });
            if (store) {
                (req as any).store = store;
                return next();
            }
        } catch (error) {
            return next(error);
        }
    }
    // Store not found
    res.status(404).json({ message: 'Store not found' });
};