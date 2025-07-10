// src/providers/PluginProvider.tsx
// Proveedor de contexto para gestionar plugins en toda la aplicación

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loadEssentialPlugins, getAvailablePlugins, LoadedPlugin } from '../utils/pluginLoader';

interface PluginContextType {
    availablePlugins: string[];
    loadedPlugins: Record<string, LoadedPlugin>;
    isInitialized: boolean;
    loading: boolean;
    error: string | null;
}

const PluginContext = createContext<PluginContextType | undefined>(undefined);

interface PluginProviderProps {
    children: ReactNode;
    autoLoadEssentials?: boolean;
}

export const PluginProvider: React.FC<PluginProviderProps> = ({
    children,
    autoLoadEssentials = true
}) => {
    const [availablePlugins] = useState<string[]>(getAvailablePlugins());
    const [loadedPlugins, setLoadedPlugins] = useState<Record<string, LoadedPlugin>>({});
    const [isInitialized, setIsInitialized] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializePlugins = async () => {
            if (autoLoadEssentials) {
                setLoading(true);
                try {
                    await loadEssentialPlugins();
                    console.log('✅ Essential plugins loaded successfully');
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to load essential plugins');
                    console.error('❌ Failed to load essential plugins:', err);
                } finally {
                    setLoading(false);
                    setIsInitialized(true);
                }
            } else {
                setIsInitialized(true);
            }
        };

        initializePlugins();
    }, [autoLoadEssentials]);

    const contextValue: PluginContextType = {
        availablePlugins,
        loadedPlugins,
        isInitialized,
        loading,
        error
    };

    return (
        <PluginContext.Provider value={contextValue}>
            {children}
        </PluginContext.Provider>
    );
};

export const usePluginContext = (): PluginContextType => {
    const context = useContext(PluginContext);
    if (context === undefined) {
        throw new Error('usePluginContext must be used within a PluginProvider');
    }
    return context;
};
