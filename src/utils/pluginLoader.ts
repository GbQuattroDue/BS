// src/utils/pluginLoader.ts
// Sistema centralizado para cargar plugins JavaScript en la aplicación React

interface PluginConfig {
    name: string;
    path: string;
    dependencies?: string[];
    global?: string; // Nombre de la variable global que expone el plugin
    required?: boolean; // Si es requerido para el funcionamiento básico
}

// Configuración de todos los plugins disponibles
export const PLUGIN_CONFIGS: Record<string, PluginConfig> = {
    // Plugins de botones
    'spin': {
        name: 'Spin.js',
        path: '/src/assets/js/plugins/buttons/spin.min.js',
        global: 'Spinner',
        required: false
    },
    'ladda': {
        name: 'Ladda',
        path: '/src/assets/js/plugins/buttons/ladda.min.js',
        dependencies: ['spin'],
        global: 'Ladda',
        required: false
    },
    'hover_dropdown': {
        name: 'Hover Dropdown',
        path: '/src/assets/js/plugins/buttons/hover_dropdown.min.js',
        required: false
    },

    // Plugins de formularios
    'steps_wizard': {
        name: 'Steps Wizard',
        path: '/src/assets/js/plugins/forms/wizards/steps.min.js',
        global: 'Steps',
        required: false
    },
    'jquery_validate': {
        name: 'jQuery Validate',
        path: '/src/assets/js/plugins/forms/validation/validate.min.js',
        dependencies: ['jquery'],
        global: '$.validator',
        required: false
    },
    'validate_additional_methods': {
        name: 'jQuery Validate Additional Methods',
        path: '/src/assets/js/plugins/forms/validation/additional_methods.min.js',
        dependencies: ['jquery_validate'],
        required: false
    },

    // Plugins de notificaciones
    'sweet_alert': {
        name: 'SweetAlert',
        path: '/src/assets/js/plugins/notifications/sweet_alert.min.js',
        global: 'swal',
        required: false
    },
    'bootbox': {
        name: 'Bootbox',
        path: '/src/assets/js/plugins/notifications/bootbox.min.js',
        global: 'bootbox',
        required: false
    },
    'pnotify': {
        name: 'PNotify',
        path: '/src/assets/js/plugins/notifications/pnotify.min.js',
        global: 'PNotify',
        required: false
    },
    'noty': {
        name: 'Noty',
        path: '/src/assets/js/plugins/notifications/noty.min.js',
        global: 'Noty',
        required: false
    },
    'jgrowl': {
        name: 'jGrowl',
        path: '/src/assets/js/plugins/notifications/jgrowl.min.js',
        global: '$.jGrowl',
        required: false
    }
};

// Tipo para los plugins cargados
export type LoadedPlugin = {
    name: string;
    instance?: any;
    loaded: boolean;
    error?: string;
};

// Estado de plugins cargados
const loadedPlugins: Record<string, LoadedPlugin> = {};

// Función para cargar un script dinámicamente
const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Verificar si el script ya está cargado
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
};

// Función para cargar un plugin específico
export const loadPlugin = async (pluginKey: string): Promise<LoadedPlugin> => {
    if (loadedPlugins[pluginKey]) {
        return loadedPlugins[pluginKey];
    }

    const config = PLUGIN_CONFIGS[pluginKey];
    if (!config) {
        throw new Error(`Plugin configuration not found: ${pluginKey}`);
    }

    const plugin: LoadedPlugin = {
        name: config.name,
        loaded: false
    };

    try {
        // Cargar dependencias primero
        if (config.dependencies) {
            for (const dep of config.dependencies) {
                await loadPlugin(dep);
            }
        }

        // Cargar el script principal
        await loadScript(config.path);

        // Verificar si el plugin expone una variable global
        if (config.global) {
            const globalPath = config.global.split('.');
            let globalObj: any = window;

            for (const path of globalPath) {
                if (globalObj && typeof globalObj === 'object' && path in globalObj) {
                    globalObj = globalObj[path];
                } else {
                    globalObj = undefined;
                    break;
                }
            }

            if (globalObj) {
                plugin.instance = globalObj;
            }
        }

        plugin.loaded = true;
        loadedPlugins[pluginKey] = plugin;

        console.log(`✅ Plugin loaded successfully: ${config.name}`);
        return plugin;

    } catch (error) {
        plugin.error = error instanceof Error ? error.message : 'Unknown error';
        loadedPlugins[pluginKey] = plugin;
        console.error(`❌ Failed to load plugin: ${config.name}`, error);
        throw error;
    }
};

// Función para cargar múltiples plugins
export const loadPlugins = async (pluginKeys: string[]): Promise<Record<string, LoadedPlugin>> => {
    const results: Record<string, LoadedPlugin> = {};

    for (const key of pluginKeys) {
        try {
            results[key] = await loadPlugin(key);
        } catch (error) {
            console.error(`Failed to load plugin: ${key}`, error);
            results[key] = {
                name: PLUGIN_CONFIGS[key]?.name || key,
                loaded: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    return results;
};

// Función para obtener un plugin cargado
export const getPlugin = (pluginKey: string): LoadedPlugin | null => {
    return loadedPlugins[pluginKey] || null;
};

// Función para verificar si un plugin está cargado
export const isPluginLoaded = (pluginKey: string): boolean => {
    return loadedPlugins[pluginKey]?.loaded || false;
};

// Función para obtener la instancia de un plugin
export const getPluginInstance = (pluginKey: string): any => {
    return loadedPlugins[pluginKey]?.instance;
};

// Función para listar todos los plugins disponibles
export const getAvailablePlugins = (): string[] => {
    return Object.keys(PLUGIN_CONFIGS);
};

// Función para cargar plugins esenciales
export const loadEssentialPlugins = async (): Promise<void> => {
    const essentialPlugins = Object.keys(PLUGIN_CONFIGS).filter(
        key => PLUGIN_CONFIGS[key].required
    );

    if (essentialPlugins.length > 0) {
        console.log('Loading essential plugins...', essentialPlugins);
        await loadPlugins(essentialPlugins);
    }
};
