// IMPORTACIONES NECESARIAS
// Importa las funciones principales de Vite para configurar el proyecto
import { defineConfig, loadEnv } from 'vite';
// Importa el plugin de React para Vite
import react from '@vitejs/plugin-react';
// Importa utilidades de Node.js para trabajar con rutas de archivos
import { fileURLToPath, URL } from 'node:url';

// CONFIGURACIÓN PRINCIPAL DE VITE
// defineConfig() es la función principal que define toda la configuración de Vite
// Recibe un parámetro ({ mode }) que indica el modo de construcción (development, production, etc.)
export default defineConfig(({ mode }) => {
  // CARGA DE VARIABLES DE ENTORNO
  // loadEnv() carga las variables de entorno desde archivos .env
  // Parámetros: (modo, directorio_raíz, prefijo_de_variables)
  // '.' significa que busque en el directorio actual
  // '' significa que cargue todas las variables (sin filtro de prefijo)
  const env = loadEnv(mode, '.', '');

  // OBJETO DE CONFIGURACIÓN QUE SE RETORNA
  return {
    // CONFIGURACIÓN DE PLUGINS
    plugins: [react()],

    // DEFINICIÓN DE VARIABLES GLOBALES
    // define: permite crear variables globales que estarán disponibles en tiempo de compilación
    define: {
      // Hace que process.env.API_KEY esté disponible en el código del frontend
      // JSON.stringify() es necesario porque define espera strings literales
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // Duplica la variable con otro nombre para compatibilidad
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },

    // CONFIGURACIÓN DE RESOLUCIÓN DE RUTAS
    resolve: {
      // alias: define atajos para las rutas de importación en el código
      alias: {
        // '@' será un atajo para la raíz del proyecto
        // fileURLToPath(new URL('.', import.meta.url)) convierte la URL del archivo actual a una ruta del sistema
        '@': fileURLToPath(new URL('.', import.meta.url)),

        // '@assets' será un atajo para la carpeta src/assets
        // Permite usar: import imagen from '@assets/images/logo.png'
        // En lugar de: import imagen from '../../../src/assets/images/logo.png'
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),

        // '@components' será un atajo para la carpeta src/components
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),

        // '@services' será un atajo para la carpeta src/services
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),

        // '@hooks' será un atajo para la carpeta src/hooks
        '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      }
    },

    // CONFIGURACIÓN DE ASSETS (RECURSOS ESTÁTICOS)
    // assetsInclude: especifica qué tipos de archivos se deben tratar como assets estáticos
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],

    // CONFIGURACIÓN DE CONSTRUCCIÓN (BUILD)
    build: {
      // rollupOptions: configuraciones específicas para Rollup (el bundler que usa Vite)
      rollupOptions: {
        // output: configuración de cómo se generarán los archivos de salida
        output: {
          // assetFileNames: función que determina cómo se nombrarán los archivos de assets
          assetFileNames: (assetInfo) => {
            // Si el archivo no tiene nombre, usa un patrón por defecto
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';

            // Extrae la información del nombre del archivo
            const info = assetInfo.name.split('.');
            // Obtiene la extensión del archivo (última parte después del punto)
            const ext = info[info.length - 1];

            // Si es una imagen (png, jpg, jpeg, svg, gif, tiff, bmp, ico)
            // /png|jpe?g|svg|gif|tiff|bmp|ico/i es una expresión regular que busca estas extensiones
            // La 'i' al final hace que sea case-insensitive (no importan mayúsculas/minúsculas)
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }

            // Si es un archivo CSS
            if (/css/i.test(ext)) {
              return `assets/css/[name]-[hash][extname]`;
            }

            // Si es una fuente (woff, woff2, eot, ttf, otf)
            // woff2? significa woff o woff2 (el ? hace opcional el 2)
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }

            // Para cualquier otro tipo de archivo, usar la carpeta assets general
            return `assets/[name]-[hash][extname]`;

            // EXPLICACIÓN DE LOS PLACEHOLDERS:
            // [name] = nombre original del archivo
            // [hash] = hash único para cache busting (evita problemas de caché)
            // [extname] = extensión original del archivo
          },
        },
      },
    },
  };
});
