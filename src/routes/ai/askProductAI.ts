import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../../config/db';
import { generateProductResponse } from '../../ai/geminiClient';
import { buildProductPrompt } from '../../ai/prompts/productQA';

const chatSchema = z.object({
    productId: z.string().uuid(),
    message: z.string().min(1),
    history: z.array(z.object({
        role: z.enum(['user', 'assistant']), // Input uses 'assistant' but Gemini might expect 'model', we map it.
        content: z.string()
    })).optional().default([])
});

export const askProductAI = async (req: Request, res: Response) => {
    try {
        const { productId, message, history } = chatSchema.parse(req.body);
        const userId = req.user!.id; // Auth middleware guarantees this exists

        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Save User Message
        await prisma.aiChatMessage.create({
            data: {
                user_id: userId,
                product_id: productId,
                role: 'user',
                content: message,
            },
        });

        // Build History for Gemini (Mapped to Gemini's expected format if needed, but our client helpers handle it)
        // Our client helper expects: { role: 'user' | 'model'; parts: { text: string }[] }[]
        const geminiHistory = history.map(h => ({
            role: h.role === 'assistant' ? 'model' : 'user' as 'model' | 'user',
            parts: [{ text: h.content }]
        }));

        const prompt = buildProductPrompt(product, message);

        // Call Gemini
        const aiResponseText = await generateProductResponse(prompt, geminiHistory);

        // Save AI Response
        await prisma.aiChatMessage.create({
            data: {
                user_id: userId,
                product_id: productId,
                role: 'assistant',
                content: aiResponseText,
            },
        });

        res.json({ response: aiResponseText });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: 'Validation Error', details: error.errors });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
