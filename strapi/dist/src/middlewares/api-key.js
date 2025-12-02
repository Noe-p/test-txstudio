"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config, { strapi }) => {
    return async (ctx, next) => {
        const apiKey = ctx.request.headers["x-api-key"];
        const expectedApiKey = process.env.API_KEY;
        // Skip API key validation for admin routes, uploads, and non-API routes
        const url = ctx.request.url;
        if (url.startsWith("/admin") ||
            url.startsWith("/_health") ||
            url.startsWith("/uploads") ||
            url === "/" ||
            !url.startsWith("/api")) {
            return await next();
        }
        // Check if API key is required and valid
        if (!expectedApiKey) {
            strapi.log.warn("API_KEY is not set in environment variables");
            return await next();
        }
        if (apiKey !== expectedApiKey) {
            ctx.status = 403;
            ctx.body = {
                error: {
                    status: 403,
                    name: "ForbiddenError",
                    message: "Invalid or missing API key",
                },
            };
            return;
        }
        await next();
    };
};
