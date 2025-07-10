// Lógica de autenticación y autorización de usuarios y login
import { Request, Response, NextFunction } from 'express';
import { userstestService } from '../services/userstestService';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombre, apellido, email, password, telefono, telefono_alt } = req.body;
    const user = await userstestService.register(nombre, apellido, email, password, telefono, telefono_alt);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const data = await userstestService.login(email, password);
    res.json(data);
  } catch (err) { next(err); }
}