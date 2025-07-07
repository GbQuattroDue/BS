
// components/BackendCodeViewer.tsx
// Componente educativo que muestra el código fuente de un backend Node.js/Express.
// Se ha actualizado para usar clases de Bootstrap para el estilo.

import React from 'react';

// --- Contenido del Código del Backend (sin cambios) ---
const packageJsonCode = `
// package.json
// Este archivo define los metadatos del proyecto y las dependencias (paquetes de npm).
{
  "name": "gestore-api",
  "version": "1.0.0",
  "description": "API para la aplicación Gestore",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.2.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/node": "^18.15.11",
    "nodemon": "^2.0.22",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.3"
  }
}
`;

const envExampleCode = `
# .env.example
# Este archivo es una plantilla. Debes copiarlo a un nuevo archivo llamado ".env"
# y rellenar las credenciales. El archivo .env NUNCA debe subirse a un repositorio (Git).

DB_HOST=tu_host_de_la_bd
DB_USER=tu_usuario_de_la_bd
DB_PASSWORD=tu_contraseña_de_la_bd
DB_NAME=el_nombre_de_tu_bd
DB_PORT=25060

JWT_SECRET=este_es_un_secreto_muy_largo_y_dificil_de_adivinar
`;

const serverTsCode = `
// src/server.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/db';
import authRoutes from './routes/auth';
import clientRoutes from './routes/clients';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal en el servidor!');
});

const startServer = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida con éxito.');
        connection.release();
        
        app.listen(PORT, () => {
            console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }
};

startServer();
`;

const dbTsCode = `
// src/config/db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT || 3306),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
`;

const authControllerCode = `
// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket {
    id: number;
    username: string;
    password: string;
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }

    try {
        const [rows] = await pool.query<User[]>('SELECT * FROM users WHERE username = ?', [username]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
`;

const clientsControllerCode = `
// src/controllers/clientsController.ts
import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clients ORDER BY name ASC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'El nombre es requerido.' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
            [name, email, phone]
        );
        res.status(201).json({ id: (result as any).insertId, name, email, phone });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error });
    }
};
`;

// Subcomponente para renderizar una sección de código con estilo Bootstrap.
const CodeBlock: React.FC<{ title: string; code: string }> = ({ title, code }) => (
    <div className="mb-4">
        <h4 className="h5 mb-2 pb-2 border-bottom">{title}</h4>
        {/* El `pre` y `code` se usan para mostrar código preformateado. */}
        <pre className="bg-dark text-white p-3 rounded" style={{ fontSize: '0.875em' }}>
            <code>{code.trim()}</code>
        </pre>
    </div>
);


export const BackendCodeViewer = () => {
    return (
        <div>
            <h2 id="modal-title" className="h3 mb-2">
                Código del Backend (Node.js/Express)
            </h2>
            <p className="text-muted mb-4">
                Este es un ejemplo completo y comentado de cómo se construiría el servidor backend para esta aplicación.
                Puedes usar este código como guía para crear tu propia API.
            </p>

            <CodeBlock title="package.json" code={packageJsonCode} />
            <CodeBlock title=".env.example (Archivo de variables de entorno)" code={envExampleCode} />
            <CodeBlock title="src/server.ts (Punto de entrada del servidor)" code={serverTsCode} />
            <CodeBlock title="src/config/db.ts (Conexión a la Base de Datos)" code={dbTsCode} />
            <CodeBlock title="src/controllers/authController.ts (Lógica de Login)" code={authControllerCode} />
            <CodeBlock title="src/controllers/clientsController.ts (Ejemplo de CRUD)" code={clientsControllerCode} />
        </div>
    );
};
