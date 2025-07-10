// This file is part of the Node.js API project.

import dotenv from 'dotenv';
import ms from 'ms';
import { userstestRepository } from '../repositories/usertestRepository';
import { hashPassword, comparePassword } from '../utils/hash';
import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

// Definir SECRET y EXPIRES desde el entorno
const SECRET = process.env.JWT_SECRET!; // Asegúrate de que no sea undefined

// Forzamos que EXPIRES sea interpretado como string
const EXPIRES: string = process.env.JWT_EXPIRES_IN || '1h';

// Convertir el valor de EXPIRES (por ejemplo, "1h") a milisegundos usando un type cast a any
const expiresInMs = (ms as any)(EXPIRES);
if (typeof expiresInMs !== 'number') {
  throw new Error(`Valor inválido para EXPIRES: ${EXPIRES}`);
}
const expiresInOption: number = expiresInMs / 1000;

// Declarar explícitamente las opciones para jwt.sign utilizando expiresInOption
const options: SignOptions = { expiresIn: expiresInOption };

/* 
   La siguiente línea se elimina pues intenta usar "user" a nivel global, 
   lo cual provoca error ya que "user" no está definido en este ámbito.
*/
// const token = jwt.sign({ sub: user.id }, SECRET, options);

export class UsertestService {
  async register(nombre: string, apellido: string, email: string, password: string, telefono: string, telefono_alt: string) {
    const exists = await userstestRepository.findByEmail(email);
    if (exists) throw { status: 409, message: 'Email ya registrado dice GESTORE' };
    const hashed = await hashPassword(password);
    const usertest = await userstestRepository.create({ nombre, apellido, email, password, telefono, telefono_alt: hashed });
    return usertest.toJSON();
  }

  async login(email: string, password: string) {
    const usertest = await userstestRepository.findByEmail(email);
    if (!usertest) throw { status: 401, message: 'Email inválido en GESTORE' };
    const valid = await comparePassword(password, usertest.password);
    if (!valid) throw { status: 401, message: 'Contraseña inválida en GESTORE' };

    // Generar el token utilizando las opciones definidas
    const token = jwt.sign({ sub: usertest.id }, SECRET, options);
    return { usertest: usertest.toJSON(), token };
  }

  async getAll() {
    return userstestRepository.findAll();
  }

  async getById(id: number) {
    const usertest = await userstestRepository.findById(id);
    if (!usertest) throw { status: 404, message: 'Usuario no encontrado en GESTORE' };
    return usertest.toJSON();
  }

  async update(id: number, data: any) {
    if (data.password) data.password = await hashPassword(data.password);
    const [count] = await userstestRepository.update(id, data);
    if (count === 0) throw { status: 404, message: 'Usuario no encontrado en GESTORE' };
    return this.getById(id);
  }

  async delete(id: number) {
    const deleted = await userstestRepository.delete(id);
    if (deleted === 0) throw { status: 404, message: 'Usuario no encontrado en GESTORE' };
    return;
  }
}

export const userstestService = new UsertestService();