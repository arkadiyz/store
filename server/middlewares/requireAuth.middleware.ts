import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
  session?: { user?: { isAdmin?: boolean } };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json('No Token, authorization denied');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) {
        return res.status(403).json('Invalid Token');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json('Invalid token');
  }
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const user = req.session?.user;

  if (!user?.isAdmin) {
    return res.status(403).send('Unauthorized Enough..');
  }

  next();
}
