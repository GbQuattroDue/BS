// src/hooks/usePlugins.ts
// Hooks de React para facilitar el uso de plugins en componentes

import { useState, useEffect, useCallback } from 'react';
import {
    loadPlugin,
    loadPlugins,
    getPlugin,
    isPluginLoaded,
    getPluginInstance,
    LoadedPlugin
} from '../utils/pluginLoader';

// Hook para cargar un plugin específico
export const usePlugin = (pluginKey: string) => {
    const [plugin, setPlugin] = useState<LoadedPlugin | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        if (isPluginLoaded(pluginKey)) {
            setPlugin(getPlugin(pluginKey));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const loadedPlugin = await loadPlugin(pluginKey);
            setPlugin(loadedPlugin);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load plugin');
        } finally {
            setLoading(false);
        }
    }, [pluginKey]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        plugin,
        instance: plugin?.instance,
        loaded: plugin?.loaded || false,
        loading,
        error,
        reload: load
    };
};

// Hook para cargar múltiples plugins
export const usePlugins = (pluginKeys: string[]) => {
    const [plugins, setPlugins] = useState<Record<string, LoadedPlugin>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const loadedPlugins = await loadPlugins(pluginKeys);
            setPlugins(loadedPlugins);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load plugins');
        } finally {
            setLoading(false);
        }
    }, [pluginKeys]);

    useEffect(() => {
        load();
    }, [load]);

    const allLoaded = Object.values(plugins).every(p => p.loaded);
    const hasErrors = Object.values(plugins).some(p => p.error);

    return {
        plugins,
        loading,
        error,
        allLoaded,
        hasErrors,
        reload: load,
        getPlugin: (key: string) => plugins[key],
        getInstance: (key: string) => plugins[key]?.instance
    };
};

// Hook específico para SweetAlert
export const useSweetAlert = () => {
    const { instance, loaded, loading, error } = usePlugin('sweet_alert');

    const showAlert = useCallback(async (options: any) => {
        if (!loaded || !instance) {
            throw new Error('SweetAlert not loaded');
        }
        return instance(options);
    }, [instance, loaded]);

    const showSuccess = useCallback(async (title: string, text?: string) => {
        return showAlert({
            title,
            text,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }, [showAlert]);

    const showError = useCallback(async (title: string, text?: string) => {
        return showAlert({
            title,
            text,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }, [showAlert]);

    const showConfirm = useCallback(async (title: string, text?: string) => {
        return showAlert({
            title,
            text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });
    }, [showAlert]);

    return {
        swal: instance,
        loaded,
        loading,
        error,
        showAlert,
        showSuccess,
        showError,
        showConfirm
    };
};

// Hook específico para validación de formularios
export const useFormValidation = () => {
    const { instance, loaded, loading, error } = usePlugin('jquery_validate');

    const validateForm = useCallback((formSelector: string, options?: any) => {
        if (!loaded || !instance) {
            console.warn('jQuery Validate not loaded');
            return null;
        }

        const $ = (window as any).$;
        if (!$ || !$(formSelector).length) {
            console.warn('jQuery or form element not found');
            return null;
        }

        return $(formSelector).validate(options);
    }, [instance, loaded]);

    return {
        validator: instance,
        loaded,
        loading,
        error,
        validateForm
    };
};

// Hook específico para wizards/steps
export const useStepsWizard = () => {
    const { instance, loaded, loading, error } = usePlugin('steps_wizard');

    const createWizard = useCallback((selector: string, options?: any) => {
        if (!loaded || !instance) {
            console.warn('Steps Wizard not loaded');
            return null;
        }

        const $ = (window as any).$;
        if (!$ || !$(selector).length) {
            console.warn('jQuery or wizard element not found');
            return null;
        }

        return $(selector).steps(options);
    }, [instance, loaded]);

    return {
        steps: instance,
        loaded,
        loading,
        error,
        createWizard
    };
};

// Hook específico para botones con carga (Ladda)
export const useLadda = () => {
    const { instance, loaded, loading, error } = usePlugin('ladda');

    const createButton = useCallback((element: HTMLElement, options?: any) => {
        if (!loaded || !instance) {
            console.warn('Ladda not loaded');
            return null;
        }

        return instance.create(element, options);
    }, [instance, loaded]);

    const bindButtons = useCallback((selector: string, options?: any) => {
        if (!loaded || !instance) {
            console.warn('Ladda not loaded');
            return;
        }

        return instance.bind(selector, options);
    }, [instance, loaded]);

    return {
        Ladda: instance,
        loaded,
        loading,
        error,
        createButton,
        bindButtons
    };
};

// Hook específico para notificaciones (PNotify)
export const usePNotify = () => {
    const { instance, loaded, loading, error } = usePlugin('pnotify');

    const showNotification = useCallback((options: any) => {
        if (!loaded || !instance) {
            console.warn('PNotify not loaded');
            return null;
        }

        return new instance(options);
    }, [instance, loaded]);

    const showSuccess = useCallback((title: string, text?: string) => {
        return showNotification({
            title,
            text,
            type: 'success'
        });
    }, [showNotification]);

    const showError = useCallback((title: string, text?: string) => {
        return showNotification({
            title,
            text,
            type: 'error'
        });
    }, [showNotification]);

    const showInfo = useCallback((title: string, text?: string) => {
        return showNotification({
            title,
            text,
            type: 'info'
        });
    }, [showNotification]);

    return {
        PNotify: instance,
        loaded,
        loading,
        error,
        showNotification,
        showSuccess,
        showError,
        showInfo
    };
};
