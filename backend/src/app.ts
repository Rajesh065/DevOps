import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import { requestLogger, errorHandler } from './middleware/authMiddleware.js';

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(requestLogger);

  // Mount API Gateway Router
  app.use('/api', apiRouter);

  // Fallback 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'NotFound', message: `Route ${req.originalUrl} not found` });
  });

  app.use(errorHandler);

  return app;
};
