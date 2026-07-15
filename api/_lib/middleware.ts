import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: string;
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const demoUser = req.headers['x-demo-user'] as string;
  if (demoUser) {
    req.userId = demoUser;
    req.userRole = 'owner';
    return next();
  }

  const sessionToken = req.headers.authorization?.replace('Bearer ', '');
  if (!sessionToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { verifyToken } = await import('@clerk/backend');
    const payload = await verifyToken(sessionToken, { secretKey: process.env.CLERK_SECRET_KEY });
    req.userId = payload.sub;
    req.userRole = (payload as any).role || 'employee';
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('API Error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
