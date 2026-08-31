import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo/local development convenience, default to admin if not passed, or attach demo user
    req.user = { id: 'usr-devops-lead', username: 'sarah-devops', role: 'devops_engineer' };
    return next();
  }

  // Parse simulated token
  const token = authHeader.split(' ')[1];
  if (token) {
    req.user = { id: 'usr-devops-lead', username: 'sarah-devops', role: 'devops_engineer' };
  }
  next();
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `User role '${req.user?.role}' does not have sufficient permissions.`
      });
    }
    next();
  };
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error Handler]', err);
  res.status(err.status || 500).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred.',
    timestamp: new Date().toISOString()
  });
};
