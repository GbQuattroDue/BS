# IcoMoon Icons - Sistema de Iconos

Este directorio contiene la implementación completa del sistema de iconos IcoMoon para el proyecto. Proporciona una interfaz TypeScript tipada para acceder a más de 1000 iconos organizados en categorías.

## 📁 Estructura

```
src/assets/icons/
├── index.ts          # Archivo principal con todas las importaciones y utilidades
├── README.md         # Esta documentación
├── app.svg          # Iconos SVG individuales
├── database.svg
└── droplet.svg
```

## 🚀 Instalación y Configuración

Los iconos ya están configurados y listos para usar. Las clases CSS se cargan automáticamente desde:
- `src/assets/css/styles_ges.min.css` - Contiene todas las definiciones de iconos IcoMoon

## 📖 Uso Básico

### Importar el sistema de iconos

```typescript
// Importar funcionalidades específicas
import { getIconClass, searchIcons, ICON_CATEGORIES, IconName } from '@assets/icons';

// O importar todo el objeto
import IcoMoonIcons from '@assets/icons';
```

### Usar iconos en componentes React/JSX

```tsx
import React from 'react';
import { getIconClass } from '@assets/icons';

function MyComponent() {
  return (
    <div>
      {/* Método 1: Usando la función helper */}
      <i className={getIconClass('home')} />
      
      {/* Método 2: Clase directa */}
      <span className="icon-user" />
      
      {/* Método 3: Con estilos adicionales */}
      <i className={`${getIconClass('settings')} text-primary`} />
    </div>
  );
}
```

### Usar iconos en HTML

```html
<!-- Iconos básicos -->
<i class="icon-home"></i>
<span class="icon-user"></span>

<!-- Con tamaños (definidos en CSS) -->
<i class="icon-heart icon-2x"></i>
<i class="icon-star icon-3x"></i>

<!-- Con rotaciones -->
<i class="icon-arrow-right icon-rotate-90"></i>
<i class="icon-refresh icon-rotate-180"></i>
```

## 🔍 Buscar y Explorar Iconos

### Buscar iconos por nombre

```typescript
import { searchIcons } from '@assets/icons';

// Buscar todos los iconos relacionados con "home"
const homeIcons = searchIcons('home');
// Resultado: ['home', 'home2', 'home5', 'home7', 'home8', 'home9']

// Buscar iconos de flechas
const arrowIcons = searchIcons('arrow');
// Resultado: ['arrow-up5', 'arrow-right5', 'arrow-down5', ...]
```

### Obtener iconos por categoría

```typescript
import { getIconsByCategory, ICON_CATEGORIES } from '@assets/icons';

// Obtener todos los iconos de usuarios
const userIcons = getIconsByCategory('users');
// Resultado: ['user', 'users', 'user-plus', 'user-minus', ...]

// Ver todas las categorías disponibles
console.log(Object.keys(ICON_CATEGORIES));
// ['home', 'content', 'colors', 'media', 'video', ...]
```

## 📂 Categorías Disponibles

| Categoría | Descripción | Ejemplos |
|-----------|-------------|----------|
| `home` | Hogar y edificios | home, office, city |
| `content` | Contenido y edición | pencil, pen, brush, design |
| `media` | Multimedia | camera, music, headphones |
| `video` | Controles de video | play, pause, stop, forward |
| `audio` | Controles de audio | volume-high, speaker-left |
| `files` | Archivos y documentos | file-text, file-download |
| `folders` | Carpetas | folder, folder-open |
| `commerce` | Comercio | cart, store, price-tag |
| `finance` | Finanzas | wallet, credit-card, coins |
| `users` | Usuarios | user, users, user-plus |
| `communication` | Comunicación | envelop, phone, location |
| `time` | Tiempo y fechas | calendar, watch, alarm |
| `devices` | Dispositivos | laptop, mobile, printer |
| `storage` | Almacenamiento | database, server, cloud |
| `tools` | Herramientas | wrench, cog, hammer |
| `charts` | Gráficos | pie-chart, stats-bars |
| `arrows` | Flechas | arrow-up, arrow-right |
| `social` | Redes sociales | facebook, twitter, youtube |
| `security` | Seguridad | lock, key, safe |
| `transportation` | Transporte | car, airplane, train |
| `status` | Estados | warning, checkmark, cross |

## 🔧 Funciones Utilitarias

### getIconClass(iconName)
Genera la clase CSS completa para un icono.

```typescript
getIconClass('home') // → 'icon-home'
getIconClass('user-plus') // → 'icon-user-plus'
```

### iconExists(iconName)
Verifica si un icono existe en el conjunto.

```typescript
iconExists('home') // → true
iconExists('invalid-icon') // → false
```

### getIconInfo(iconName)
Obtiene información detallada sobre un icono.

```typescript
const info = getIconInfo('home');
// → {
//     name: 'home',
//     className: 'icon-home',
//     category: 'home',
//     unicode: null
//   }
```

## 🎨 Personalización CSS

### Tamaños de iconos

```css
.icon-1x { font-size: 1em; }
.icon-2x { font-size: 2em; }
.icon-3x { font-size: 3em; }
.icon-4x { font-size: 4em; }
.icon-5x { font-size: 5em; }
```

### Rotaciones

```css
.icon-rotate-90 { transform: rotate(90deg); }
.icon-rotate-180 { transform: rotate(180deg); }
.icon-rotate-270 { transform: rotate(270deg); }
```

### Reflejos

```css
.icon-flip-horizontal { transform: scaleX(-1); }
.icon-flip-vertical { transform: scaleY(-1); }
```

## 💡 Ejemplos Prácticos

### Componente de navegación

```tsx
import React from 'react';
import { getIconClass } from '@assets/icons';

const NavigationMenu = () => {
  const menuItems = [
    { icon: 'home', label: 'Inicio', path: '/' },
    { icon: 'users', label: 'Usuarios', path: '/users' },
    { icon: 'chart', label: 'Análisis', path: '/analytics' },
    { icon: 'cog', label: 'Configuración', path: '/settings' },
  ];

  return (
    <nav>
      {menuItems.map(item => (
        <a key={item.path} href={item.path} className="nav-item">
          <i className={getIconClass(item.icon)} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
};
```

### Selector de iconos

```tsx
import React, { useState } from 'react';
import { searchIcons, getIconClass } from '@assets/icons';

const IconPicker = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const icons = searchIcons(search);

  return (
    <div className="icon-picker">
      <input
        type="text"
        placeholder="Buscar iconos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <div className="icon-grid">
        {icons.map(icon => (
          <button
            key={icon}
            onClick={() => onSelect(icon)}
            className="icon-button"
            title={icon}
          >
            <i className={getIconClass(icon)} />
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Botones con iconos

```tsx
import React from 'react';
import { getIconClass } from '@assets/icons';

const ActionButtons = () => (
  <div className="button-group">
    <button className="btn btn-primary">
      <i className={getIconClass('plus')} />
      Crear
    </button>
    
    <button className="btn btn-secondary">
      <i className={getIconClass('download')} />
      Descargar
    </button>
    
    <button className="btn btn-danger">
      <i className={getIconClass('bin')} />
      Eliminar
    </button>
  </div>
);
```

## 🚨 Buenas Prácticas

### ✅ Recomendado

```tsx
// Usar la función helper para type safety
import { getIconClass } from '@assets/icons';
<i className={getIconClass('home')} />

// Verificar existencia antes de usar
import { iconExists, getIconClass } from '@assets/icons';
const iconName = dynamicIconName;
if (iconExists(iconName)) {
  return <i className={getIconClass(iconName)} />;
}

// Usar categorías para organizar
import { getIconsByCategory } from '@assets/icons';
const socialIcons = getIconsByCategory('social');
```

### ❌ Evitar

```tsx
// No escribir clases manualmente sin verificación
<i className="icon-home" /> // Sin type safety

// No asumir que un icono existe
<i className={`icon-${unknownIcon}`} /> // Puede fallar

// No mezclar diferentes sistemas de iconos
<i className="fa fa-home icon-user" /> // Inconsistente
```

## 🔍 Debugging

### Ver todos los iconos disponibles

```typescript
import { ALL_ICONS, TOTAL_ICONS } from '@assets/icons';

console.log(`Total de iconos: ${TOTAL_ICONS}`);
console.log('Todos los iconos:', ALL_ICONS);
```

### Verificar configuración

```typescript
import IcoMoonIcons from '@assets/icons';

// Verificar que el sistema funciona
console.log('Sistema de iconos cargado:', !!IcoMoonIcons);
console.log('Iconos disponibles:', IcoMoonIcons.total);
console.log('Categorías:', IcoMoonIcons.categories);
```

## 🆘 Soporte

Si tienes problemas:

1. **Icono no se muestra**: Verifica que el CSS esté cargado y el nombre sea correcto
2. **Error de TypeScript**: Usa `iconExists()` para verificar antes de usar
3. **Nuevo icono necesario**: Consulta la documentación de IcoMoon para agregar iconos

## 📝 Contribuir

Para agregar nuevos iconos:

1. Agrega los iconos al CSS en `styles_ges.min.css`
2. Actualiza el tipo `IconName` en `index.ts`
3. Agrega el icono a la categoría apropiada en `ICON_CATEGORIES`
4. Actualiza esta documentación si es necesario

---

**Versión**: 1.0.0  
**Iconos incluidos**: 1000+  
**Última actualización**: Julio 2025
