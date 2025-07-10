// Rutas para el CRUD de usuarios

import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getUserstest,
  getUserstestById,
  updateUserstest,
  deleteUserstest
} from '../controllers/userstestController';
import { validateRequest } from '../middlewares/validateRequest';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas posteriores requieren autenticación
router.use(authMiddleware);

router.get('/', getUserstest);

router.get(
  '/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  validateRequest,
  getUserstestById
);

router.put(
  '/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Debe ser un email válido'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validateRequest,
  updateUserstest
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  validateRequest,
  deleteUserstest
);

export default router;