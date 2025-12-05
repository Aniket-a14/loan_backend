import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export const generateProductResponse = async (
    prompt: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
    try {
        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw new Error('Failed to generate AI response');
    }
};
