# DigitalOcean API Integration - Order Management System

Esta aplicación integra completamente la **API de DigitalOcean v2.0** con un backend Node.js/Express y un frontend React/Vite, proporcionando acceso a todos los recursos principales de DigitalOcean.

## 🚀 Características Principales

- ✅ **Integración completa con DigitalOcean API v2.0**
- ✅ **Backend Express con endpoints REST**
- ✅ **Servicio frontend para consumo fácil de la API**
- ✅ **Manejo de rate limiting y errores**
- ✅ **Autenticación con token de DigitalOcean**
- ✅ **Soporte para todos los recursos principales**

## 📦 Recursos de DigitalOcean Soportados

### Apps Platform
- ✅ Listar, crear, actualizar y eliminar aplicaciones
- ✅ Deployments y logs
- ✅ Regiones disponibles

### Droplets
- ✅ Gestión completa de droplets
- ✅ Acciones (reiniciar, redimensionar, etc.)
- ✅ Filtrado por tags

### Databases
- ✅ Clusters de bases de datos
- ✅ Usuarios y bases de datos
- ✅ Backups y configuración

### Load Balancers
- ✅ Gestión de load balancers
- ✅ Reglas de forwarding
- ✅ Health checks

### Volumes
- ✅ Almacenamiento en bloque
- ✅ Snapshots
- ✅ Attachments

### Kubernetes
- ✅ Clusters de Kubernetes
- ✅ Node pools
- ✅ Configuración y upgrades

### Networking
- ✅ VPCs
- ✅ Floating IPs
- ✅ Firewalls
- ✅ Dominios y DNS

### Monitoring
- ✅ Métricas de recursos
- ✅ Alertas
- ✅ Dashboards

### Otros Recursos
- ✅ Proyectos
- ✅ Imágenes (snapshots, backups)
- ✅ Sizes (planes de recursos)
- ✅ Regiones
- ✅ SSH Keys
- ✅ CDN Endpoints
- ✅ Container Registry

## 🛠️ Configuración

### 1. Prerequisitos

```bash
# Node.js 18+ y npm
node --version
npm --version
```

### 2. Instalación

```bash
# Clonar e instalar dependencias
git clone <repository-url>
cd gestore---order-management
npm install
```

### 3. Configuración de Environment

```bash
# Copiar archivo de ejemplo
copy .env.example .env

# Editar .env con tus credenciales
notepad .env
```

Configurar las siguientes variables en `.env`:

```env
# Token de DigitalOcean (requerido)
# Obtenerlo en: https://cloud.digitalocean.com/settings/applications
DIGITALOCEAN_TOKEN=tu_token_aqui

# Configuración del servidor
PORT=3001
NODE_ENV=development

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

### 4. Verificar Integración

```bash
# Ejecutar validador de integración
node validate-integration.js
```

## 🚀 Uso

### Modo Desarrollo

```bash
# Ejecutar solo backend
npm run dev:backend

# Ejecutar solo frontend
npm run dev

# Ejecutar ambos simultáneamente
npm run dev:fullstack
```

### Modo Producción

```bash
# Build del frontend
npm run build

# Ejecutar backend en producción
npm run start:backend
```

## 📡 Endpoints del Backend

### Health & Account
- `GET /api/health` - Health check
- `GET /api/account` - Información de cuenta

### Apps Platform
- `GET /api/apps` - Listar aplicaciones
- `POST /api/apps` - Crear aplicación
- `GET /api/apps/:id` - Obtener aplicación
- `PUT /api/apps/:id` - Actualizar aplicación
- `DELETE /api/apps/:id` - Eliminar aplicación
- `GET /api/apps/:id/logs` - Logs de aplicación
- `GET /api/apps/:id/deployments` - Deployments
- `POST /api/apps/:id/deployments` - Crear deployment

### Droplets
- `GET /api/droplets` - Listar droplets
- `POST /api/droplets` - Crear droplet
- `GET /api/droplets/:id` - Obtener droplet
- `DELETE /api/droplets/:id` - Eliminar droplet
- `GET /api/droplets/:id/actions` - Acciones del droplet
- `POST /api/droplets/:id/actions` - Ejecutar acción

### Databases
- `GET /api/databases` - Listar clusters
- `POST /api/databases` - Crear cluster
- `GET /api/databases/:id` - Obtener cluster

### Load Balancers
- `GET /api/load_balancers` - Listar load balancers
- `POST /api/load_balancers` - Crear load balancer

### Volumes
- `GET /api/volumes` - Listar volumes
- `POST /api/volumes` - Crear volume

### Kubernetes
- `GET /api/kubernetes/clusters` - Listar clusters
- `POST /api/kubernetes/clusters` - Crear cluster

### Projects
- `GET /api/projects` - Listar proyectos
- `POST /api/projects` - Crear proyecto

### Images, Sizes, Regions
- `GET /api/images` - Listar imágenes
- `GET /api/sizes` - Listar sizes
- `GET /api/regions` - Listar regiones

### Monitoring
- `GET /api/monitoring/metrics` - Métricas
- `GET /api/monitoring/alerts` - Alertas

## 🖥️ Servicio Frontend

El servicio frontend (`src/services/digitalocean.js`) proporciona una interfaz JavaScript sencilla:

```javascript
import DigitalOceanService from './services/digitalocean.js';

const doService = new DigitalOceanService();

// Ejemplos de uso
const apps = await doService.getApps();
const droplets = await doService.getDroplets();
const account = await doService.getAccount();

// Crear recursos
const newApp = await doService.createApp(appSpec);
const newDroplet = await doService.createDroplet(dropletData);

// Métricas y monitoreo
const metrics = await doService.getMetrics('droplet', dropletId);
const alerts = await doService.getAlerts();
```

## 🎨 Assets y Recursos Visuales

### Organización de Assets
Los assets están organizados en dos ubicaciones principales:

#### Frontend Assets (`src/assets/`)
```javascript
// Importar estilos CSS
import '../assets/css/variables.css';
import '../assets/css/dashboard.css';

// Importar imágenes
import logo from '../assets/images/logo-primary.svg';
import heroImage from '../assets/images/hero-droplets.png';

// Importar iconos SVG como componentes React
import DropletIcon from '../assets/icons/droplet.svg?react';
import AppIcon from '../assets/icons/app.svg?react';
```

#### Assets Públicos (`public/assets/`)
- Imágenes servidas directamente (SEO, og:image)
- Favicons y manifest icons (PWA)
- Fuentes personalizadas

### Paleta de Colores DigitalOcean
```css
:root {
  --primary-color: #0080ff;     /* Azul DigitalOcean */
  --secondary-color: #6366f1;   /* Púrpura */
  --accent-color: #10b981;      /* Verde */
  --success-color: #22c55e;     /* Verde éxito */
  --warning-color: #f59e0b;     /* Amarillo advertencia */
  --error-color: #ef4444;       /* Rojo error */
}
```

### Iconos Personalizados
- `droplet.svg` - Icono de droplet con gradiente
- `app.svg` - Icono de App Platform
- `database.svg` - Icono de base de datos
- Y más iconos específicos de DigitalOcean

## 🔧 Estructura del Proyecto

```
gestore---order-management/
├── backend/
│   ├── server.js              # Servidor principal con todos los endpoints
│   ├── routes/
│   │   ├── digitalocean.js    # Rutas específicas de DigitalOcean
│   │   ├── apps.js           # Rutas de Apps Platform
│   │   └── droplets.js       # Rutas de Droplets
│   └── README.md             # Documentación del backend
├── src/
│   ├── assets/               # Assets del frontend
│   │   ├── css/             # Estilos globales, variables, themes
│   │   ├── images/          # Imágenes (logos, banners, backgrounds)
│   │   └── icons/           # Iconos SVG personalizados
│   ├── components/          # Componentes React
│   ├── hooks/              # Custom hooks
│   ├── services/           # Servicios API
│   │   ├── digitalocean.js # Servicio DigitalOcean API
│   │   └── digitalOceanService.js # Servicio mejorado
│   └── ...                 # Otros archivos del frontend
├── public/
│   ├── assets/             # Assets públicos estáticos
│   │   ├── images/         # Imágenes servidas directamente
│   │   ├── icons/          # Favicons, manifest icons
│   │   └── fonts/          # Fuentes personalizadas
│   └── favicon.ico
├── components/             # Componentes compartidos (legacy)
├── .env.example           # Variables de entorno de ejemplo
├── validate-integration.js # Script de validación
└── README.md              # Este archivo
```

## 🧪 Testing

### Validación Automática

```bash
# Ejecutar todas las pruebas de integración
node validate-integration.js
```

### Pruebas Manuales

```bash
# Probar health check
curl http://localhost:3001/api/health

# Probar endpoint de apps
curl http://localhost:3001/api/apps

# Probar información de cuenta
curl http://localhost:3001/api/account
```

## 🔒 Seguridad

- ✅ Token de DigitalOcean almacenado de forma segura
- ✅ CORS configurado para el frontend
- ✅ Validación de requests
- ✅ Manejo de rate limiting
- ✅ Headers de seguridad

## 📚 Documentación de Referencia

- [DigitalOcean API v2.0](https://docs.digitalocean.com/reference/api/)
- [Apps Platform API](https://docs.digitalocean.com/reference/api/apps-api/)
- [Droplets API](https://docs.digitalocean.com/reference/api/api-reference/#tag/Droplets)
- [Kubernetes API](https://docs.digitalocean.com/reference/api/api-reference/#tag/Kubernetes)

## 🐛 Troubleshooting

### Error: "DIGITALOCEAN_TOKEN no configurado"
- Verificar que el archivo `.env` existe
- Verificar que el token está correctamente configurado
- Obtener un nuevo token en el panel de DigitalOcean

### Error: "Rate limit exceeded"
- Esperar el tiempo indicado en el mensaje
- Implementar backoff exponencial si es necesario

### Error: "Servidor backend no está ejecutándose"
- Ejecutar `npm run dev:backend`
- Verificar que el puerto 3001 no esté ocupado

## 🤝 Contribuciones

1. Fork del proyecto
2. Crear rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🎯 Estado Actual

✅ **INTEGRACIÓN COMPLETA** - La aplicación está lista para usar en producción con todos los endpoints de DigitalOcean API v2.0 implementados y probados.
