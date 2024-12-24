import Env from "./env";

export const domainConfig = {
    baseDomain: Env.BASE_DOMAIN || 'yourdomain.com',
    protocol: Env.NODE_ENV === 'production' ? 'https' : 'http'
};