// Middleware para la autenticación de usuarios. Validación de JWT y autorización de acceso a rutas protegidas
// Este middleware verifica si el usuario está autenticado antes de permitir el acceso a ciertas rutas
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export function authMiddleware(
  req: Request, 
  res: Response, next: 
  NextFunction
): void {
  // Verifica si el token JWT está presente en los headers de la solicitud
  const auth = req.headers.authorization?.split(' ')[1];
  if (!auth) {
    // En lugar de "return res.status(401)…", haz lo siguiente:
    res.status(401).json({ message: 'Token requerido' });
    return; // Aseguramos que la función finaliza sin retornar un valor.
  }
  try {
    const payload = jwt.verify(auth, process.env.JWT_SECRET!) as any;
    (req as any).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}
