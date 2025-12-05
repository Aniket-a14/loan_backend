import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserPayload } from '../types';

export const signToken = (payload: UserPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): UserPayload | null => {
    try {
        return jwt.verify(token, env.JWT_SECRET) as UserPayload;
    } catch (error) {
        return null;
    }
};
