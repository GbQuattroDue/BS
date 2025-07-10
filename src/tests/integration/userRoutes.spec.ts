// Tests de integración para las rutas de autenticación y usuarios

import request from 'supertest';
import { app } from '../../app';
import sequelize from '../../config/database';

beforeAll(async () => await sequelize.sync({ force: true }));
afterAll(async () => await sequelize.close());

describe('Rutas de /api/auth & /api/users', () => {
  let token: string;

  it('Registro y login', async () => {
    // Registro
    const r1 = await request(app).post('/api/auth/register')
      .send({ username: 'u', email: 'a@b.com', password: '123456' });
    expect(r1.status).toBe(201);

    // Login
    const r2 = await request(app).post('/api/auth/login')
      .send({ email: 'a@b.com', password: '123456' });
    expect(r2.body.token).toBeDefined();
    token = r2.body.token;
  });

  it('GET usuarios protegida', async () => {
    const r = await request(app).get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
});