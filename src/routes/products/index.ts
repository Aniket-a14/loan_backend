import { Router } from 'express';
import { getAllProducts } from './getAllProducts';
import { getProductById } from './getProductById';

export const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
