import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../config/db';

const paramsSchema = z.object({
    id: z.string().uuid(),
});

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = paramsSchema.parse(req.params);

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Invalid ID format' });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
