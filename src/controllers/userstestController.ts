// CRUD (Create, Read, Update, Delete) para usuarios
// id, empresa_inicio, nombre, apellido, email, password, telefono, telefono_alt, account_expired, account_locked, enabled, password_expired, suscripcion_01, suscripcion_02, suscripcion_03, nombre_completo, class, avatar_file_name, code_pass, version, creado, modificado

import { Request, Response, NextFunction } from 'express';
import { userstestService } from '../services/userstestService';

export async function getUserstest(req: Request, res: Response, next: NextFunction) {
  try {
    const userstest = await userstestService.getAll();
    res.json(userstest);
  } catch (err) { next(err); }
}

export async function getUserstestById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = +req.params.id;
    const usertest = await userstestService.getById(id);
    res.json(usertest);
  } catch (err) { next(err); }
}

export async function updateUserstest(req: Request, res: Response, next: NextFunction) {
  try {
    const id = +req.params.id;
    const usertest = await userstestService.update(id, req.body);
    res.json(usertest);
  } catch (err) { next(err); }
}

export async function deleteUserstest(req: Request, res: Response, next: NextFunction) {
  try {
    const id = +req.params.id;
    await userstestService.delete(id);
    res.status(204).send();
  } catch (err) { next(err); }
}