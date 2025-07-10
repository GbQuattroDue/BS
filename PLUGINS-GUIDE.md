# Sistema de Plugins para la Aplicación Gestore

Este documento describe cómo utilizar el sistema de plugins integrado en la aplicación Gestore.

## Estructura del Sistema

### 📁 Archivos Principales

- `src/utils/pluginLoader.ts` - Sistema centralizado para cargar plugins
- `src/hooks/usePlugins.ts` - Hooks de React para usar plugins
- `src/providers/PluginProvider.tsx` - Proveedor de contexto para plugins
- `components/PluginComponents/` - Componentes que usan plugins

### 🔧 Plugins Disponibles

#### Botones y UI
- **Spin.js**: Indicadores de carga giratorios
- **Ladda**: Botones con indicadores de carga integrados
- **Hover Dropdown**: Dropdowns que se activan con hover

#### Formularios
- **Steps Wizard**: Creación de formularios por pasos
- **jQuery Validate**: Validación de formularios
- **Additional Methods**: Métodos adicionales de validación

#### Notificaciones
- **SweetAlert**: Alertas modernas y personalizables
- **PNotify**: Notificaciones no intrusivas
- **Bootbox**: Diálogos modales simples
- **Noty**: Sistema de notificaciones ligero
- **jGrowl**: Notificaciones estilo Growl

## 🚀 Uso Básico

### 1. Configurar el Proveedor

Envuelve tu aplicación con el `PluginProvider`:

```tsx
import { PluginProvider } from './src/providers/PluginProvider';

function App() {
  return (
    <PluginProvider autoLoadEssentials={true}>
      {/* Tu aplicación */}
    </PluginProvider>
  );
}
```

### 2. Usar Hooks de Plugins

#### Hook General para Cualquier Plugin

```tsx
import { usePlugin } from './src/hooks/usePlugins';

const MyComponent = () => {
  const { plugin, instance, loaded, loading, error } = usePlugin('sweet_alert');
  
  if (loading) return <div>Cargando plugin...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <button onClick={() => instance && instance('¡Hola!')}>
      Mostrar Alerta
    </button>
  );
};
```

#### Hook Específico para SweetAlert

```tsx
import { useSweetAlert } from './src/hooks/usePlugins';

const MyComponent = () => {
  const { showSuccess, showError, showConfirm, loaded } = useSweetAlert();
  
  const handleAction = async () => {
    if (!loaded) return;
    
    const result = await showConfirm('¿Continuar?', 'Esta acción no se puede deshacer');
    if (result.isConfirmed) {
      await showSuccess('¡Éxito!', 'Acción completada');
    }
  };
  
  return <button onClick={handleAction}>Ejecutar Acción</button>;
};
```

### 3. Usar Componentes Predefinidos

#### SweetAlertButton

```tsx
import { SweetAlertButton } from './components/PluginComponents';

const MyComponent = () => {
  return (
    <SweetAlertButton
      className="btn btn-danger"
      onClick={async () => {
        // Tu lógica aquí
        await deleteUser();
      }}
      showConfirmation={true}
      confirmTitle="¿Eliminar usuario?"
      confirmText="Esta acción no se puede deshacer"
      successTitle="¡Eliminado!"
      successText="El usuario ha sido eliminado correctamente"
    >
      Eliminar Usuario
    </SweetAlertButton>
  );
};
```

#### LaddaButton

```tsx
import { LaddaButton } from './components/PluginComponents';

const MyComponent = () => {
  return (
    <LaddaButton
      className="btn btn-primary"
      onClick={async () => {
        // Simular carga
        await new Promise(resolve => setTimeout(resolve, 2000));
      }}
      style="zoom-in"
      loadingText="Guardando..."
    >
      Guardar Datos
    </LaddaButton>
  );
};
```

#### FormWizard

```tsx
import { FormWizard } from './components/PluginComponents';

const MyComponent = () => {
  const steps = [
    {
      title: 'Información Personal',
      content: <PersonalInfoForm />,
      validate: () => validatePersonalInfo()
    },
    {
      title: 'Dirección',
      content: <AddressForm />,
      validate: () => validateAddress()
    },
    {
      title: 'Confirmación',
      content: <ConfirmationForm />
    }
  ];

  return (
    <FormWizard
      steps={steps}
      onFinish={async (data) => {
        console.log('Wizard completado:', data);
      }}
      transitionEffect="slide"
      enableFinishButton={true}
    />
  );
};
```

## 🔧 Configuración Avanzada

### Cargar Plugins Específicos

```tsx
import { loadPlugin, loadPlugins } from './src/utils/pluginLoader';

// Cargar un plugin específico
const loadSweetAlert = async () => {
  try {
    const plugin = await loadPlugin('sweet_alert');
    console.log('SweetAlert cargado:', plugin);
  } catch (error) {
    console.error('Error cargando SweetAlert:', error);
  }
};

// Cargar múltiples plugins
const loadMultiplePlugins = async () => {
  const plugins = await loadPlugins(['sweet_alert', 'ladda', 'steps_wizard']);
  console.log('Plugins cargados:', plugins);
};
```

### Verificar Estado de Plugins

```tsx
import { isPluginLoaded, getPluginInstance } from './src/utils/pluginLoader';

// Verificar si un plugin está cargado
if (isPluginLoaded('sweet_alert')) {
  const swal = getPluginInstance('sweet_alert');
  swal('Plugin ya está cargado!');
}
```

### Hook para Múltiples Plugins

```tsx
import { usePlugins } from './src/hooks/usePlugins';

const MyComponent = () => {
  const { plugins, allLoaded, loading, error } = usePlugins([
    'sweet_alert',
    'ladda',
    'pnotify'
  ]);
  
  if (loading) return <div>Cargando plugins...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!allLoaded) return <div>Algunos plugins no se cargaron</div>;
  
  return (
    <div>
      <h3>Todos los plugins están listos</h3>
      {/* Tu contenido aquí */}
    </div>
  );
};
```

## 📝 Agregar Nuevos Plugins

### 1. Configurar el Plugin

Edita `src/utils/pluginLoader.ts` y agrega la configuración:

```typescript
export const PLUGIN_CONFIGS: Record<string, PluginConfig> = {
  // ... plugins existentes ...
  'mi_nuevo_plugin': {
    name: 'Mi Nuevo Plugin',
    path: '/src/assets/js/plugins/categoria/mi_plugin.min.js',
    global: 'MiPlugin',
    dependencies: ['jquery'], // Si es necesario
    required: false
  }
};
```

### 2. Crear Hook Específico

Agrega un hook en `src/hooks/usePlugins.ts`:

```typescript
export const useMiNuevoPlugin = () => {
  const { instance, loaded, loading, error } = usePlugin('mi_nuevo_plugin');
  
  const metodoPersonalizado = useCallback((opciones: any) => {
    if (!loaded || !instance) {
      console.warn('Mi Nuevo Plugin no está cargado');
      return;
    }
    return instance.init(opciones);
  }, [instance, loaded]);
  
  return {
    plugin: instance,
    loaded,
    loading,
    error,
    metodoPersonalizado
  };
};
```

### 3. Crear Componente (Opcional)

Crea un componente en `components/PluginComponents/`:

```tsx
import React from 'react';
import { useMiNuevoPlugin } from '../../src/hooks/usePlugins';

interface MiComponenteProps {
  // Props del componente
}

export const MiComponente: React.FC<MiComponenteProps> = (props) => {
  const { metodoPersonalizado, loaded } = useMiNuevoPlugin();
  
  if (!loaded) {
    return <div>Cargando plugin...</div>;
  }
  
  return (
    // Tu componente aquí
    <div></div>
  );
};
```

## 🎯 Mejores Prácticas

1. **Verificar Carga**: Siempre verifica que el plugin esté cargado antes de usarlo
2. **Manejo de Errores**: Implementa fallbacks para cuando los plugins no se carguen
3. **Lazy Loading**: Carga plugins solo cuando los necesites para mejorar el rendimiento
4. **Dependencias**: Asegúrate de declarar todas las dependencias correctamente
5. **Testing**: Considera usar mocks para los plugins en las pruebas

## 🔍 Troubleshooting

### Plugin No Se Carga

1. Verifica que el archivo existe en la ruta especificada
2. Revisa las dependencias del plugin
3. Comprueba la consola del navegador para errores

### Variable Global No Disponible

1. Asegúrate de que el plugin expone la variable global correctamente
2. Verifica que el path de la variable global sea correcto
3. Algunos plugins pueden requerir inicialización adicional

### Conflictos entre Plugins

1. Revisa el orden de carga de los plugins
2. Asegúrate de que no hay conflictos de nombres
3. Considera usar namespaces para evitar colisiones

## 📚 Recursos Adicionales

- [Documentación de SweetAlert](https://sweetalert.js.org/)
- [Documentación de Ladda](https://lab.hakim.se/ladda/)
- [Documentación de jQuery Steps](http://www.jquery-steps.com/)
- [Documentación de PNotify](https://sciactive.com/pnotify/)

---

**Nota**: Este sistema de plugins está diseñado para ser extensible y mantenible. Si necesitas agregar funcionalidad adicional, sigue los patrones establecidos en este documento.
