import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({ error: 'Validation Error', details: err.errors });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
};
