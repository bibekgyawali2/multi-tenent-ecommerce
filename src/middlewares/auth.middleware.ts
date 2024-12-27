import { Request, Response, NextFunction } from "express";
import JWTService from "../services/utils/jwt.service";
import Env from "../config/env";

class AuthMiddleware {
    private static instance: AuthMiddleware;

    private constructor() { }

    static getInstance(): AuthMiddleware {
        if (!AuthMiddleware.instance) {
            AuthMiddleware.instance = new AuthMiddleware();
        }
        return AuthMiddleware.instance;
    }

    private extractToken(authHeader: string | undefined): string | null {
        if (!authHeader) return null;
        const tokenParts = authHeader.split(" ");
        return tokenParts.length === 2 ? tokenParts[1] : null;
    }

    private parseToken(token: string): any {
        return JWTService.verify(token, Env.JWT_SECRET);
    }

    private handleTokenVerification(req: Request, token: string): void {
        const verified = this.parseToken(token);
        req.user = { id: verified.id, ...verified }; // Include user id from token.
    }
    private getShopIdFromToken(token: string): string {
        const verified = this.parseToken(token);
        return verified.shopId;
    }
    private authMiddleware(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.header("Authorization");
        const token = this.extractToken(authHeader);

        if (!token) {
            res.status(401).json({ error: "Access Denied" });
            return;
        }

        try {
            this.handleTokenVerification(req, token);
            next();
        } catch (err) {
            res.status(401).json({ error: "Invalid Token" });
        }
    }

    getMiddleware(): (req: Request, res: Response, next: NextFunction) => void {
        return this.authMiddleware.bind(this);
    }
}

export default AuthMiddleware.getInstance();
