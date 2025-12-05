import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../config/db';
import { Prisma } from '@prisma/client';

const querySchema = z.object({
    bank: z.string().optional(),
    apr_min: z.string().transform(Number).optional(),
    apr_max: z.string().transform(Number).optional(),
    min_income: z.string().transform(Number).optional(),
    min_credit_score: z.string().transform(Number).optional(),
});

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const filters = querySchema.parse(req.query);

        const where: Prisma.ProductWhereInput = {};

        if (filters.bank) {
            where.bank = { contains: filters.bank, mode: 'insensitive' };
        }
        if (filters.apr_min !== undefined || filters.apr_max !== undefined) {
            const aprFilter: Prisma.DecimalFilter = {};
            if (filters.apr_min !== undefined) {
                aprFilter.gte = filters.apr_min;
            }
            if (filters.apr_max !== undefined) {
                aprFilter.lte = filters.apr_max;
            }
            where.rate_apr = aprFilter;
        }
        if (filters.min_income !== undefined) {
            where.min_income = { lte: filters.min_income }; // Income Requirement <= User Income? 
            // Usually "min_income" means user needs at least this much. 
            // So if User has income X, we want products where min_income <= X (User Qualifies).
            // Or if the API is "Find products with min user income of X", usually it filters by exact or range.
            // Requirements say: "Query parameters: min_income". 
            // I will assume this filters products where the product's min_income <= param (User's income).
            where.min_income = { lte: filters.min_income };
        }
        if (filters.min_credit_score !== undefined) {
            where.min_credit_score = { lte: filters.min_credit_score }; // Product req <= User score
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { name: 'asc' },
        });

        res.json(products);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation Error', details: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
