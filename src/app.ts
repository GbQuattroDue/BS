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
import { authMiddleware } from './middlewares/authMiddleware';

export const app = express();

// Configuración de EJS y vistas
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../template/layout_1/LTR/default/full'),
  path.join(__dirname, '../template/layout_1/LTR/default/full/partials/views')
]);

// Configuración de archivos estáticos
app.use('/assets', express.static(path.join(__dirname, '../template/layout_1/LTR/default/full/assets')));
app.use('/global_assets', express.static(path.join(__dirname, '../template/global_assets')));
app.use('/template', express.static(path.join(__dirname, '../template')));

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



// Ruta principal - redirige al login
app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.redirect('/login');
});

// Ruta de login
app.get('/login', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

// Ruta de registro
app.get('/registro', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, '../template/layout_1/LTR/default/full/ges_login_registration.html'));
});

// Ruta de recuperación de contraseña
app.get('/recuperar-password', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, '../template/layout_1/LTR/default/full/ges_login_password_recover.html'));
});

// Ruta del dashboard principal (después del login)
app.get('/dashboard', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, '../template/layout_1/LTR/default/full/index.html'));
});

// Ruta de perfil de usuario
app.get('/perfil', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, 'views/perfil.html'));
});

// Rutas con parámetros dinámicos
app.get('/usuario/:id', (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.params.id;
  res.json({ 
    mensaje: `Mostrando usuario con ID: ${userId}`,
    usuario: { id: userId, nombre: 'Usuario Ejemplo' }
  });
});

// Ruta con múltiples parámetros
app.get('/pedido/:pedidoId/cliente/:clienteId', (req: Request, res: Response, next: NextFunction): void => {
  const { pedidoId, clienteId } = req.params;
  res.json({ 
    pedido: pedidoId, 
    cliente: clienteId,
    mensaje: `Pedido ${pedidoId} del cliente ${clienteId}`
  });
});

// Ruta con parámetros opcionales (usando query parameters)
app.get('/productos', (req: Request, res: Response, next: NextFunction): void => {
  const { categoria, precio_min, precio_max } = req.query;
  res.json({
    filtros: {
      categoria: categoria || 'todas',
      precio_min: precio_min || 0,
      precio_max: precio_max || 'sin límite'
    },
    mensaje: 'Lista de productos filtrada'
  });
});

// ==================== RUTAS PROTEGIDAS ====================
// Estas rutas requieren autenticación (token JWT válido)

// Dashboard protegido - requiere login
app.get('/dashboard-seguro', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const userId = (req as any).userId; // El middleware authMiddleware agrega este campo
  res.json({
    mensaje: 'Acceso autorizado al dashboard',
    usuarioId: userId,
    timestamp: new Date()
  });
});

// Perfil del usuario logueado
app.get('/mi-perfil', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const userId = (req as any).userId;
  res.json({
    mensaje: 'Datos del perfil del usuario',
    usuarioId: userId,
    // Aquí podrías hacer consultas a la base de datos para obtener datos reales
  });
});

// Configuración del usuario (solo usuario autenticado)
app.get('/configuracion', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, 'views/configuracion.html'));
});

// ==================== RUTAS CON DIFERENTES MÉTODOS HTTP ====================

// POST - Crear nuevo recurso
app.post('/crear-nota', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const { titulo, contenido } = req.body;
  const userId = (req as any).userId;
  
  // Aquí harías la lógica para guardar en la base de datos
  res.json({
    mensaje: 'Nota creada exitosamente',
    nota: {
      id: Date.now(), // ID temporal
      titulo,
      contenido,
      autor: userId,
      fechaCreacion: new Date()
    }
  });
});

// PUT - Actualizar recurso existente
app.put('/actualizar-nota/:id', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const notaId = req.params.id;
  const { titulo, contenido } = req.body;
  const userId = (req as any).userId;
  
  res.json({
    mensaje: `Nota ${notaId} actualizada`,
    datos: { titulo, contenido, editadoPor: userId }
  });
});

// DELETE - Eliminar recurso
app.delete('/eliminar-nota/:id', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const notaId = req.params.id;
  const userId = (req as any).userId;
  
  res.json({
    mensaje: `Nota ${notaId} eliminada`,
    eliminadoPor: userId,
    timestamp: new Date()
  });
});

// ==================== RUTAS CON VALIDACIÓN ====================

// Ruta con validación personalizada
app.post('/crear-producto', authMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const { nombre, precio, categoria } = req.body;
  
  // Validaciones manuales
  const errores = [];
  
  if (!nombre || nombre.trim().length < 3) {
    errores.push('El nombre debe tener al menos 3 caracteres');
  }
  
  if (!precio || isNaN(precio) || precio <= 0) {
    errores.push('El precio debe ser un número mayor a 0');
  }
  
  if (!categoria || !['electrónicos', 'ropa', 'hogar', 'deportes'].includes(categoria)) {
    errores.push('La categoría debe ser: electrónicos, ropa, hogar o deportes');
  }
  
  // Si hay errores, devolver error 400
  if (errores.length > 0) {
    res.status(400).json({
      error: 'Datos inválidos',
      errores: errores
    });
    return;
  }
  
  // Si todo está bien, crear el producto
  res.json({
    mensaje: 'Producto creado exitosamente',
    producto: {
      id: Date.now(),
      nombre: nombre.trim(),
      precio: parseFloat(precio),
      categoria,
      creadoPor: (req as any).userId,
      fechaCreacion: new Date()
    }
  });
});

// ==================== GRUPO DE RUTAS: ADMINISTRACIÓN ====================
// Estas rutas son solo para administradores

// Middleware para verificar si el usuario es admin
const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const userId = (req as any).userId;
  
  // Aquí podrías verificar en la base de datos si el usuario es admin
  // Por ahora, simulamos que el usuario con ID "1" es admin
  if (userId === "1") {
    next(); // Continuar al siguiente middleware/ruta
  } else {
    res.status(403).json({ error: 'Acceso denegado. Se requieren privilegios de administrador.' });
  }
};

// Rutas de administración (requieren ser admin)
app.get('/admin/usuarios', authMiddleware, adminMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  res.json({
    mensaje: 'Lista de todos los usuarios (solo admin)',
    usuarios: [
      { id: 1, nombre: 'Admin', rol: 'administrador' },
      { id: 2, nombre: 'Usuario1', rol: 'usuario' },
      { id: 3, nombre: 'Usuario2', rol: 'usuario' }
    ]
  });
});

app.delete('/admin/usuario/:id', authMiddleware, adminMiddleware, (req: Request, res: Response, next: NextFunction): void => {
  const usuarioId = req.params.id;
  res.json({
    mensaje: `Usuario ${usuarioId} eliminado por administrador`,
    eliminadoPor: (req as any).userId
  });
});

// ==================== PÁGINA DE DEMOSTRACIÓN ====================
// Ruta para ver ejemplos de todas las rutas avanzadas
app.get('/rutas-avanzadas', (req: Request, res: Response, next: NextFunction): void => {
  res.sendFile(path.join(__dirname, 'views/rutas-avanzadas.html'));
});

// Ruta básica de prueba de API
app.get('/api', (req: Request, res: Response, next: NextFunction): void => {
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