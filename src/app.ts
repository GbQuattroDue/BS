// File: src/app.ts 
// Configura el servidor Express, conecta a la base de datos MySQL y define las rutas principales.

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import userstestRoutes from './routes/usertestRoutes';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

// Configuración de EJS y vistas
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../template/layout_1/LTR/default/full'),
  path.join(__dirname, '../template/layout_1/LTR/default/full/partials/views')
]);

// Seguridad y performance
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(morgan('tiny'));

// Parseo de JSON
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/userstest', userstestRoutes);



// Ruta básica de prueba
app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.send('API funcionando');
});
// Ruta que renderiza la vista con parciales
app.get('/clientes/nuevo', (req, res) => {
  res.render('ges_cliente_wizard');
});

// Ruta para manejar 404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware global de errores 
app.use(errorHandler);