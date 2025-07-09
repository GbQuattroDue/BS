# Integración del Sistema de Iconos IcoMoon

Este archivo muestra cómo integrar y usar el sistema de iconos IcoMoon en diferentes partes de la aplicación Gestore Order Management.

## 🔗 Integración en Componentes Existentes

### 1. Actualizar el componente Sidebar

```tsx
// components/Sidebar.tsx
import React from 'react';
import { getIconClass } from '@assets/icons';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { 
      icon: 'home', 
      label: 'Dashboard', 
      path: '/', 
      active: true 
    },
    { 
      icon: 'cart', 
      label: 'Pedidos', 
      path: '/orders' 
    },
    { 
      icon: 'users', 
      label: 'Clientes', 
      path: '/clients' 
    },
    { 
      icon: 'box', 
      label: 'Productos', 
      path: '/products' 
    },
    { 
      icon: 'chart', 
      label: 'Reportes', 
      path: '/reports' 
    },
    { 
      icon: 'cog', 
      label: 'Configuración', 
      path: '/settings' 
    }
  ];

  return (
    <nav className="sidebar bg-dark">
      <div className="sidebar-header p-3">
        <h3 className="text-white">
          <i className={getIconClass('store')} /> Gestore
        </h3>
      </div>
      
      <ul className="list-unstyled">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a 
              href={item.path} 
              className={`nav-link d-flex align-items-center p-3 text-light ${
                item.active ? 'active bg-primary' : ''
              }`}
            >
              <i className={`${getIconClass(item.icon)} me-2`} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### 2. Mejorar el componente CreateOrderWizard

```tsx
// components/CreateOrderWizard.tsx
import React, { useState } from 'react';
import { getIconClass } from '@assets/icons';

export const CreateOrderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    {
      number: 1,
      title: 'Seleccionar Cliente',
      icon: 'user',
      description: 'Elige o crea un cliente'
    },
    {
      number: 2,
      title: 'Agregar Productos',
      icon: 'cart-add',
      description: 'Selecciona productos y cantidades'
    },
    {
      number: 3,
      title: 'Revisar Pedido',
      icon: 'checkmark-circle',
      description: 'Confirma los detalles del pedido'
    }
  ];

  return (
    <div className="create-order-wizard">
      {/* Indicador de pasos */}
      <div className="step-indicator mb-4">
        <div className="row">
          {steps.map((step) => (
            <div key={step.number} className="col-4">
              <div className={`step-item text-center ${
                currentStep >= step.number ? 'active' : ''
              }`}>
                <div className="step-circle mb-2">
                  <i className={getIconClass(step.icon)} />
                </div>
                <h6>{step.title}</h6>
                <small className="text-muted">{step.description}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido del paso actual */}
      <div className="step-content">
        {currentStep === 1 && <ClientSelector />}
        {currentStep === 2 && <ProductSelector />}
        {currentStep === 3 && <OrderReview />}
      </div>

      {/* Botones de navegación */}
      <div className="step-navigation d-flex justify-content-between mt-4">
        <button 
          className="btn btn-secondary"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <i className={getIconClass('arrow-left5')} /> Anterior
        </button>
        
        <button 
          className="btn btn-primary"
          onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
          disabled={currentStep === 3}
        >
          Siguiente <i className={getIconClass('arrow-right5')} />
        </button>
      </div>
    </div>
  );
};
```

### 3. Actualizar el componente de Alertas

```tsx
// components/Alert.tsx
import React from 'react';
import { getIconClass, IconName } from '@assets/icons';

interface AlertProps {
  type: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertConfig = {
  success: { icon: 'checkmark-circle' as IconName, class: 'alert-success' },
  warning: { icon: 'warning' as IconName, class: 'alert-warning' },
  danger: { icon: 'cancel-circle2' as IconName, class: 'alert-danger' },
  info: { icon: 'bubble-notification' as IconName, class: 'alert-info' }
};

export const Alert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  dismissible = false,
  onDismiss 
}) => {
  const config = alertConfig[type];

  return (
    <div className={`alert ${config.class} d-flex align-items-center`} role="alert">
      <i className={`${getIconClass(config.icon)} me-2 flex-shrink-0`} />
      
      <div className="flex-grow-1">
        {title && <h6 className="alert-heading mb-1">{title}</h6>}
        <div>{message}</div>
      </div>

      {dismissible && (
        <button 
          type="button" 
          className="btn-close ms-auto" 
          onClick={onDismiss}
          aria-label="Close"
        >
          <i className={getIconClass('cross2')} />
        </button>
      )}
    </div>
  );
};
```

## 🎨 Estilos CSS Personalizados

### Archivo: `src/assets/css/icons-custom.css`

```css
/* Estilos personalizados para iconos */

/* Tamaños adicionales */
.icon-xs { font-size: 0.75em; }
.icon-sm { font-size: 0.875em; }
.icon-lg { font-size: 1.25em; }
.icon-xl { font-size: 1.5em; }

/* Animaciones */
.icon-spin {
  animation: icon-spin 1s infinite linear;
}

.icon-pulse {
  animation: icon-pulse 1s infinite ease-in-out;
}

@keyframes icon-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes icon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Estados de hover */
.icon-hover:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Colores personalizados */
.icon-primary { color: var(--bs-primary); }
.icon-secondary { color: var(--bs-secondary); }
.icon-success { color: var(--bs-success); }
.icon-warning { color: var(--bs-warning); }
.icon-danger { color: var(--bs-danger); }
.icon-info { color: var(--bs-info); }

/* Iconos en botones */
.btn .icon:first-child {
  margin-right: 0.375rem;
}

.btn .icon:last-child {
  margin-left: 0.375rem;
}

.btn .icon:only-child {
  margin: 0;
}

/* Iconos en navegación */
.nav-link .icon {
  margin-right: 0.5rem;
  opacity: 0.8;
}

.nav-link:hover .icon,
.nav-link.active .icon {
  opacity: 1;
}

/* Indicadores de paso */
.step-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--bs-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid var(--bs-border-color);
}

.step-item.active .step-circle {
  background: var(--bs-primary);
  color: white;
  border-color: var(--bs-primary);
}

/* Iconos de estado en tablas */
.table .status-icon {
  width: 1.5rem;
  text-align: center;
}

.status-pending { color: var(--bs-warning); }
.status-completed { color: var(--bs-success); }
.status-cancelled { color: var(--bs-danger); }
.status-processing { color: var(--bs-info); }
```

## 🔄 Migración de Iconos Existentes

### Reemplazar iconos hardcodeados

```tsx
// Antes
<i className="fa fa-home"></i>
<span className="material-icons">home</span>

// Después
import { getIconClass } from '@assets/icons';
<i className={getIconClass('home')} />
```

### Script de migración automática (opcional)

```bash
# Buscar y reemplazar iconos comunes
# Este es un ejemplo de cómo podrías automatizar la migración

# Font Awesome a IcoMoon
sed -i 's/fa fa-home/icon-home/g' src/**/*.tsx
sed -i 's/fa fa-user/icon-user/g' src/**/*.tsx
sed -i 's/fa fa-cog/icon-cog/g' src/**/*.tsx

# Material Icons a IcoMoon
sed -i 's/material-icons">home</span>/icon-home"><\/i>/g' src/**/*.tsx
sed -i 's/material-icons">person</span>/icon-user"><\/i>/g' src/**/*.tsx
```

## 📊 Uso en Tablas y Listas

### Tabla de pedidos con iconos de estado

```tsx
import React from 'react';
import { getIconClass, IconName } from '@assets/icons';

interface Order {
  id: string;
  client: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
}

const statusConfig = {
  pending: { icon: 'clock' as IconName, class: 'status-pending', label: 'Pendiente' },
  processing: { icon: 'spinner' as IconName, class: 'status-processing', label: 'Procesando' },
  completed: { icon: 'checkmark' as IconName, class: 'status-completed', label: 'Completado' },
  cancelled: { icon: 'cross2' as IconName, class: 'status-cancelled', label: 'Cancelado' }
};

const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          const status = statusConfig[order.status];
          return (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>
                <span className={`d-flex align-items-center ${status.class}`}>
                  <i className={`${getIconClass(status.icon)} me-2 status-icon`} />
                  {status.label}
                </span>
              </td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button className="btn btn-outline-primary" title="Ver">
                    <i className={getIconClass('eye')} />
                  </button>
                  <button className="btn btn-outline-secondary" title="Editar">
                    <i className={getIconClass('pencil')} />
                  </button>
                  <button className="btn btn-outline-danger" title="Eliminar">
                    <i className={getIconClass('bin')} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
```

## 🔧 Configuración TypeScript

### Actualizar tsconfig.json para paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/assets/icons": ["src/assets/icons"],
      "@/assets/icons/*": ["src/assets/icons/*"]
    }
  }
}
```

### Tipos globales (opcional)

```typescript
// types/global.d.ts
import type { IconName } from '@assets/icons';

declare global {
  interface IconProps {
    name: IconName;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '1x' | '2x' | '3x' | '4x' | '5x';
    className?: string;
    onClick?: () => void;
  }
}
```

## 🚀 Mejores Prácticas de Implementación

1. **Importación centralizada**: Siempre importa desde el index principal
2. **Validación de iconos**: Usa `iconExists()` para iconos dinámicos
3. **Consistencia**: Usa el mismo sistema en toda la aplicación
4. **Performance**: Los iconos son fuentes, se cargan rápidamente
5. **Accesibilidad**: Agrega `title` o `aria-label` cuando sea necesario

## 📝 Lista de Verificación para la Migración

- [ ] Importar el sistema de iconos en componentes principales
- [ ] Reemplazar iconos hardcodeados existentes
- [ ] Actualizar componentes de navegación
- [ ] Migrar botones y controles
- [ ] Actualizar tablas y listas
- [ ] Agregar estilos CSS personalizados
- [ ] Probar en diferentes navegadores
- [ ] Validar accesibilidad
- [ ] Documentar uso para el equipo
- [ ] Crear guía de estilo visual

Con esta implementación, tendrás un sistema de iconos robusto, tipado y fácil de mantener para toda la aplicación Gestore Order Management.
