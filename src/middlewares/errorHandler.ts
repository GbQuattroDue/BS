// Description: Middleware to handle errors in the application
import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Error interno' });
}