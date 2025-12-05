import { Request } from 'express';

export interface UserPayload {
    id: string;
    email: string;
    display_name: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
