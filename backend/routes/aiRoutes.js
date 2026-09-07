import express from 'express';
import { chatWithAi } from '../controller/aiController.js';

const aiRoutes = express.Router();

aiRoutes.post('/chat', chatWithAi);

export default aiRoutes;
