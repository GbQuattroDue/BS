// This file is part of the OpenAPI Generator project
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const rounds = +process.env.BCRYPT_SALT_ROUNDS!;

export const hashPassword = (plain: string) => bcrypt.hash(plain, rounds);
export const comparePassword = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
