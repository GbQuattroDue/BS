# DigitalOcean Backend API

Este es un backend compatible con la API de DigitalOcean que proporciona endpoints RESTful para gestionar recursos de DigitalOcean.

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DIGITALOCEAN_TOKEN=your_digitalocean_api_token_here
PORT=3001
NODE_ENV=development
```

### Obtener Token de DigitalOcean

1. Ve a [DigitalOcean Control Panel](https://cloud.digitalocean.com/settings/applications)
2. En la sección "Applications & API", haz clic en "Generate New Token"
3. Dale un nombre descriptivo y selecciona los permisos necesarios
4. Copia el token generado y úsalo como `DIGITALOCEAN_TOKEN`

## Instalación

```bash
npm install
```

## Uso

### Modo Desarrollo
```bash
npm run dev:backend
```

### Modo Producción
```bash
npm run start:backend
```

## Endpoints Disponibles

### General
- `GET /api/health` - Verificación de estado del servicio
- `GET /api/account` - Información de la cuenta

### Apps Platform
- `GET /api/apps` - Listar todas las aplicaciones
- `POST /api/apps` - Crear nueva aplicación
- `GET /api/apps/:id` - Obtener aplicación específica
- `PUT /api/apps/:id` - Actualizar aplicación
- `DELETE /api/apps/:id` - Eliminar aplicación
- `GET /api/apps/:id/logs` - Obtener logs de aplicación

### Droplets
- `GET /api/droplets` - Listar todos los Droplets
- `POST /api/droplets` - Crear nuevo Droplet
- `GET /api/droplets/:id` - Obtener Droplet específico
- `DELETE /api/droplets/:id` - Eliminar Droplet

### Databases
- `GET /api/databases` - Listar bases de datos
- `POST /api/databases` - Crear nueva base de datos

### Load Balancers
- `GET /api/load_balancers` - Listar load balancers
- `POST /api/load_balancers` - Crear nuevo load balancer

### Kubernetes
- `GET /api/kubernetes/clusters` - Listar clusters de Kubernetes
- `POST /api/kubernetes/clusters` - Crear nuevo cluster

### Monitoring
- `GET /api/monitoring/alerts` - Listar alertas
- `POST /api/monitoring/alerts` - Crear nueva alerta

### Storage
- `GET /api/volumes` - Listar volúmenes
- `POST /api/volumes` - Crear nuevo volumen

### Recursos del Sistema
- `GET /api/regions` - Listar regiones disponibles
- `GET /api/sizes` - Listar tamaños de Droplet disponibles
- `GET /api/images` - Listar imágenes disponibles

## Ejemplos de Uso

### Crear una Nueva App
```bash
curl -X POST http://localhost:3001/api/apps \
  -H "Content-Type: application/json" \
  -d '{
    "spec": {
      "name": "sample-app",
      "region": "nyc3",
      "services": [
        {
          "name": "web",
          "source_dir": "/",
          "github": {
            "repo": "digitalocean/sample-nodejs",
            "branch": "main"
          },
          "run_command": "npm start",
          "environment_slug": "node-js",
          "instance_count": 1,
          "instance_size_slug": "basic-xxs"
        }
      ]
    }
  }'
```

### Crear un Nuevo Droplet
```bash
curl -X POST http://localhost:3001/api/droplets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "example.com",
    "region": "nyc3",
    "size": "s-1vcpu-1gb",
    "image": "ubuntu-20-04-x64",
    "ssh_keys": [],
    "backups": false,
    "ipv6": true,
    "monitoring": true,
    "tags": ["web"]
  }'
```

### Listar Apps con Filtros
```bash
curl "http://localhost:3001/api/apps?page=1&per_page=10&with_projects=true"
```

## Estructura de Respuesta

Todas las respuestas siguen el formato estándar de la API de DigitalOcean:

### Respuesta Exitosa
```json
{
  "data": { ... },
  "links": { ... },
  "meta": { ... }
}
```

### Respuesta de Error
```json
{
  "error": "Error Type",
  "message": "Descripción detallada del error"
}
```

## Autenticación

Este backend utiliza el token de API de DigitalOcean para autenticar todas las requests. El token debe incluirse en las variables de entorno y será enviado automáticamente en el header `Authorization: Bearer <token>` a la API de DigitalOcean.

## Características

- ✅ Compatible con la última versión de la API de DigitalOcean (v2)
- ✅ Manejo completo de errores
- ✅ Soporte para paginación
- ✅ Middleware CORS habilitado
- ✅ Logging de errores
- ✅ Validación de respuestas HTTP
- ✅ Soporte para operaciones asíncronas
- ✅ Rate limiting respetado (manejo de códigos 429)

## Códigos de Estado

- `200` - OK
- `201` - Creado
- `202` - Aceptado (operaciones asíncronas)
- `204` - Sin contenido (eliminación exitosa)
- `400` - Solicitud incorrecta
- `401` - No autorizado
- `404` - No encontrado
- `429` - Límite de velocidad excedido
- `500` - Error interno del servidor

## Limitaciones de Rate

La API de DigitalOcean tiene límites de velocidad:
- 5,000 requests por hora
- 250 requests por minuto (burst limit)

El backend maneja automáticamente estos límites y devuelve códigos de error apropiados cuando se exceden.
