import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { errorHandler } from './utils/errorHandler';
import { authRouter } from './routes/auth';
import { productRouter } from './routes/products';
import { aiRouter } from './routes/ai';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/ai', aiRouter);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
