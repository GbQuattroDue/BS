// Rutas relacionadas con la autenticación de usuarios (login)
import { Request, Response, NextFunction, Router } from 'express';
import { body, validationResult  } from 'express-validator';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middlewares/validateRequest';


const router = Router();

router.post(
  '/register',
  body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validateRequest,
  register
);

router.post(
  '/login',
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  validateRequest,
  login
);

export default router;

console.log('authRoutes.ts cargado correctamente');

// Este archivo define las rutas para la autenticación de usuarios, incluyendo el registro y el inicio de sesión.