// File: src/server.ts
// Descripción: Punto de entrada del servidor Express >> node dist/server.js
import dotenv from 'dotenv';
import sequelize from './config/database';
import { app } from './app';

dotenv.config();
const PORT = process.env.PORT || 25060;

// Verificar la sincronización de la base de datos y arranque del servidor
sequelize.sync({ alter: false })
  .then(() => {
    console.log('DataBase Strongbox on DigitalOcean: OK');
    app.listen(PORT, () => console.log(`Buenas noticias!Escuchando en ${PORT}`));
  })
  .catch(console.error);

