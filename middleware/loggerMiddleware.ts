import { Request, Response, NextFunction } from "express";
import { Log } from "../src/models/Log";

export const loggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { method, url, ip, query, body } = req;

    const log = new Log({
        method,
        url,
        ipAddress: ip,
        queryParameters: query,
        requestBody: body,
    });

    await log.save();

    next();
};