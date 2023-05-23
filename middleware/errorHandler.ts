import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';
import Joi from "joi";
interface CustomError extends Error {
    status?: number;
}

function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err);
    const profileIdSchema = Joi.object({
        profile_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    });
    const profileSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        name: Joi.string().required(),
        nickname: Joi.string().required()
    });

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    // Handle specific route errors
    if (req.path === '/api/profile') {
        if (req.method === 'GET') {
            return res
                .status(500)
                .json({ error: 'An error occurred while fetching the profile data.' });
        } else if (req.method === 'POST') {
            const { error } = profileSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            return res
                .status(500)
                .json({ error: 'An error occurred while creating or fetching the profile data.' });
        }
    } else if (req.path === '/api/favorite') {
        if (req.method === 'GET') {
            return res
                .status(500)
                .json({ error: 'An error occurred while fetching the favorite data.' });
        }
    } else if (req.path.startsWith('/api/favorite/')) {
        if (req.method === 'GET') {
            const { error } = profileIdSchema.validate(req.params.profile_id);
            if(error){
                return res
                    .status(400)
                    .json({ error: error.details[0].message });
            }
            return res
                .status(500)
                .json({ error: 'An error occurred while fetching the favorite data.' });
        }
    } else if (req.path === '/api/simulator') {
        if (req.method === 'GET') {
            return res
                .status(500)
                .json({ error: 'An error occurred while fetching the simulator data.' });
        }
    } else if (req.path.startsWith('/api/simulator/')) {
        if (req.method === 'GET') {
            const { error } = profileIdSchema.validate(req.params.profile_id);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            return res
                .status(500)
                .json({ error: 'An error occurred while fetching the simulator data.' });
        }
    } else if (req.path.startsWith('/api/simulator/') && req.method === 'POST') {
        const { error } = profileIdSchema.validate(req.params.profile_id);
        return res
            .status(500)
            .json({ error: 'An error occurred while creating the simulator data.' });
    }
    const statusCode = err.status || 500;
    return res.status(statusCode).json({ error: 'Internal server error' });
}

export default errorHandler;
