// components/PluginComponents/index.ts
// Exportaciones centralizadas de componentes que usan plugins

export { SweetAlertButton } from './SweetAlertButton';
export { LaddaButton } from './LaddaButton';
export { FormWizard } from './FormWizard';

// Re-exportar hooks de plugins
export {
    usePlugin,
    usePlugins,
    useSweetAlert,
    useFormValidation,
    useStepsWizard,
    useLadda,
    usePNotify
} from '../../src/hooks/usePlugins';

// Re-exportar utilidades de plugins
export {
    loadPlugin,
    loadPlugins,
    getPlugin,
    isPluginLoaded,
    getPluginInstance,
    getAvailablePlugins,
    loadEssentialPlugins,
    PLUGIN_CONFIGS
} from '../../src/utils/pluginLoader';

// Re-exportar proveedor
export { PluginProvider, usePluginContext } from '../../src/providers/PluginProvider';
