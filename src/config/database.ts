// Configuracion y conexion a la base de datos MySQL. Este archivo se encarga de establecer la conexión
// a la base de datos MySQL utilizando las variables de entorno definidas en el archivo .env

import { Sequelize } from "sequelize"; // Importamos el constructor Sequelize del paquete sequelize.
import dotenv from "dotenv"; // Importamos dotenv para manejar las variables de entorno y cargamos las variables definidas en el archivo .env.

dotenv.config();

const isTest = process.env.NODE_ENV === 'test'; // Si estamos en un entorno de pruebas, usamos una base de datos diferente.

// Creamos una instancia de Sequelize utilizando las variables de entorno.
const sequelize = new Sequelize({
  database: process.env.DB_NAME,     // Nombre de la base de datos. El "!" indica a TypeScript que con seguridad existe.
  username: process.env.DB_USER,     // Usuario de la base de datos.
  password: process.env.DB_PASSWORD, // Contraseña del usuario.
  host: process.env.DB_HOST,         // Dirección del servidor MySQL donde se aloja la base de datos.
  port: parseInt(process.env.DB_PORT || '25060', 10), // Puerto del servidor MySQL, por defecto es 3306.
  dialect: (process.env.DB_DIALECT as any) || 'mysql', // Indica que usamos MySQL como dialecto.

  native: true, // Usamos la conexión nativa de MySQL.
  dialectOptions: {    
      connectTimeout: 10000,     
      ssl: {
        require: true, // Requerimos SSL para la conexión.
        rejectUnauthorized: false, // No rechazamos certificados no autorizados (útil en entornos de desarrollo).
      },        
    },
  define: {
      freezeTableName: true,
    },
  storage: isTest ? process.env.DB_STORAGE : undefined,
  logging: false,
  pool: {
    max: 10, min: 0, acquire: 30000, idle: 10000
  }
});

export default sequelize; // Exportamos la configuración para poder usarla en otros archivos.