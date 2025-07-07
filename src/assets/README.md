# Assets - Guía de Organización

Este directorio contiene todos los assets estáticos del proyecto organizados por tipo.

## 📁 Estructura de Carpetas

### `/src/assets/` - Assets del Frontend

#### `/css/` - Estilos
- `variables.css` - Variables CSS globales, colores, espaciado
- `dashboard.css` - Estilos específicos del dashboard
- `components.css` - Estilos de componentes reutilizables
- `utilities.css` - Clases de utilidad

#### `/images/` - Imágenes del Frontend
- Logos de la aplicación
- Imágenes de fondo
- Ilustraciones
- Capturas de pantalla

#### `/icons/` - Iconos SVG Personalizados
- Iconos específicos de DigitalOcean
- Iconos de estado (activo, inactivo, etc.)
- Iconos de recursos (droplets, apps, etc.)

### `/public/assets/` - Assets Públicos

#### `/images/` - Imágenes Estáticas
- Imágenes que se sirven directamente
- Imágenes para SEO (og:image, etc.)
- Imágenes de documentación

#### `/icons/` - Iconos de Sistema
- favicon.ico
- apple-touch-icon.png
- manifest icons (PWA)

#### `/fonts/` - Fuentes Personalizadas
- Archivos de fuentes (.woff2, .woff, .ttf)
- Archivos CSS de fuentes

## 🎨 Paleta de Colores DigitalOcean

```css
/* Colores principales */
--primary-color: #0080ff;     /* Azul DigitalOcean */
--secondary-color: #6366f1;   /* Púrpura */
--accent-color: #10b981;      /* Verde */

/* Estados */
--success-color: #22c55e;     /* Verde éxito */
--warning-color: #f59e0b;     /* Amarillo advertencia */
--error-color: #ef4444;       /* Rojo error */
```

## 📝 Convenciones de Nomenclatura

### Imágenes
- `logo-primary.svg` - Logo principal
- `bg-dashboard.jpg` - Imagen de fondo del dashboard
- `hero-droplets.png` - Imagen hero para droplets

### Iconos
- `icon-droplet.svg` - Icono de droplet
- `icon-app.svg` - Icono de aplicación
- `icon-database.svg` - Icono de base de datos

### CSS
- `variables.css` - Variables globales
- `dashboard.css` - Estilos del dashboard
- `components.css` - Estilos de componentes

## 🚀 Uso en Componentes

### Importar CSS
```javascript
import '../assets/css/variables.css';
import '../assets/css/dashboard.css';
```

### Importar Imágenes
```javascript
import logo from '../assets/images/logo-primary.svg';
import heroImage from '../assets/images/hero-droplets.png';
```

### Importar Iconos
```javascript
import DropletIcon from '../assets/icons/icon-droplet.svg?react';
import AppIcon from '../assets/icons/icon-app.svg?react';
```

## 📱 Assets Responsive

### Imágenes
- Usar formato WebP cuando sea posible
- Incluir versiones de diferentes tamaños
- Optimizar para retina display (@2x)

### Iconos
- Usar SVG para escalabilidad
- Definir viewBox apropiado
- Usar colores CSS variables cuando sea posible

## 🔧 Herramientas Recomendadas

### Optimización de Imágenes
- [Squoosh](https://squoosh.app/) - Compresión de imágenes
- [SVGO](https://github.com/svg/svgo) - Optimización de SVG

### Generación de Iconos
- [Heroicons](https://heroicons.com/) - Iconos consistentes
- [Phosphor Icons](https://phosphoricons.com/) - Iconos alternativos

### Fuentes
- [Google Fonts](https://fonts.google.com/) - Fuentes web
- [Font Squirrel](https://www.fontsquirrel.com/) - Generador de webfonts
