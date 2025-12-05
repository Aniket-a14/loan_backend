import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../../config/db';
import { signToken } from '../../utils/jwt';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    display_name: z.string().min(2),
});

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, display_name } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password_hash,
                display_name,
            },
        });

        const token = signToken({
            id: user.id,
            email: user.email,
            display_name: user.display_name,
        });

        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.display_name } });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation Error', details: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
