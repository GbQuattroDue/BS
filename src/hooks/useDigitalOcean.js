import { useState, useEffect } from 'react';
import { digitalOceanService } from '../services/digitalOceanService';

// Hook genérico para manejar estado de API
export function useApiState(initialData = null) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (apiCall) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiCall();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(initialData);
        setError(null);
        setLoading(false);
    };

    return { data, loading, error, execute, reset, setData };
}

// Hook para Apps
export function useApps() {
    const { data, loading, error, execute, reset } = useApiState({ apps: [] });

    const fetchApps = (params) => execute(() => digitalOceanService.getApps(params));
    const createApp = (appSpec) => execute(() => digitalOceanService.createApp(appSpec));
    const updateApp = (id, updateData) => execute(() => digitalOceanService.updateApp(id, updateData));
    const deleteApp = (id) => execute(() => digitalOceanService.deleteApp(id));

    return {
        apps: data?.apps || [],
        loading,
        error,
        fetchApps,
        createApp,
        updateApp,
        deleteApp,
        reset
    };
}

// Hook para una App específica
export function useApp(appId) {
    const { data, loading, error, execute } = useApiState(null);

    const fetchApp = () => execute(() => digitalOceanService.getApp(appId));
    const updateApp = (updateData) => execute(() => digitalOceanService.updateApp(appId, updateData));
    const deleteApp = () => execute(() => digitalOceanService.deleteApp(appId));
    const getLogs = (params) => execute(() => digitalOceanService.getAppLogs(appId, params));

    useEffect(() => {
        if (appId) {
            fetchApp();
        }
    }, [appId]);

    return {
        app: data?.app,
        loading,
        error,
        fetchApp,
        updateApp,
        deleteApp,
        getLogs
    };
}

// Hook para Droplets
export function useDroplets() {
    const { data, loading, error, execute, reset } = useApiState({ droplets: [] });

    const fetchDroplets = (params) => execute(() => digitalOceanService.getDroplets(params));
    const createDroplet = (dropletData) => execute(() => digitalOceanService.createDroplet(dropletData));
    const deleteDroplet = (id) => execute(() => digitalOceanService.deleteDroplet(id));

    return {
        droplets: data?.droplets || [],
        loading,
        error,
        fetchDroplets,
        createDroplet,
        deleteDroplet,
        reset
    };
}

// Hook para un Droplet específico
export function useDroplet(dropletId) {
    const { data, loading, error, execute } = useApiState(null);

    const fetchDroplet = () => execute(() => digitalOceanService.getDroplet(dropletId));
    const deleteDroplet = () => execute(() => digitalOceanService.deleteDroplet(dropletId));

    useEffect(() => {
        if (dropletId) {
            fetchDroplet();
        }
    }, [dropletId]);

    return {
        droplet: data?.droplet,
        loading,
        error,
        fetchDroplet,
        deleteDroplet
    };
}

// Hook para Databases
export function useDatabases() {
    const { data, loading, error, execute, reset } = useApiState({ databases: [] });

    const fetchDatabases = (params) => execute(() => digitalOceanService.getDatabases(params));
    const createDatabase = (databaseData) => execute(() => digitalOceanService.createDatabase(databaseData));

    return {
        databases: data?.databases || [],
        loading,
        error,
        fetchDatabases,
        createDatabase,
        reset
    };
}

// Hook para Load Balancers
export function useLoadBalancers() {
    const { data, loading, error, execute, reset } = useApiState({ load_balancers: [] });

    const fetchLoadBalancers = (params) => execute(() => digitalOceanService.getLoadBalancers(params));
    const createLoadBalancer = (lbData) => execute(() => digitalOceanService.createLoadBalancer(lbData));

    return {
        loadBalancers: data?.load_balancers || [],
        loading,
        error,
        fetchLoadBalancers,
        createLoadBalancer,
        reset
    };
}

// Hook para Kubernetes Clusters
export function useKubernetes() {
    const { data, loading, error, execute, reset } = useApiState({ kubernetes_clusters: [] });

    const fetchClusters = (params) => execute(() => digitalOceanService.getKubernetesClusters(params));
    const createCluster = (clusterData) => execute(() => digitalOceanService.createKubernetesCluster(clusterData));

    return {
        clusters: data?.kubernetes_clusters || [],
        loading,
        error,
        fetchClusters,
        createCluster,
        reset
    };
}

// Hook para recursos del sistema (regiones, tamaños, imágenes)
export function useSystemResources() {
    const [regions, setRegions] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const [regionsData, sizesData, imagesData] = await Promise.all([
                digitalOceanService.getRegions(),
                digitalOceanService.getSizes(),
                digitalOceanService.getImages()
            ]);

            setRegions(regionsData.regions || []);
            setSizes(sizesData.sizes || []);
            setImages(imagesData.images || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return {
        regions,
        sizes,
        images,
        loading,
        error,
        refetch: fetchAll
    };
}

// Hook para verificar la conexión con el backend
export function useHealthCheck() {
    const [isHealthy, setIsHealthy] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkHealth = async () => {
        setLoading(true);
        try {
            await digitalOceanService.healthCheck();
            setIsHealthy(true);
            setError(null);
        } catch (err) {
            setIsHealthy(false);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkHealth();

        // Check health every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    return {
        isHealthy,
        loading,
        error,
        checkHealth
    };
}
