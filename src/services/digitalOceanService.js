// DigitalOcean API Service
class DigitalOceanService {
    constructor(baseUrl = 'http://localhost:3001/api') {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Handle 204 No Content responses
            if (response.status === 204) {
                return { success: true };
            }

            return await response.json();
        } catch (error) {
            console.error('DigitalOcean API Error:', error);
            throw error;
        }
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }

    // Account operations
    async getAccount() {
        return this.request('/account');
    }

    // Apps Platform operations
    async getApps(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/apps?${searchParams}`);
    }

    async createApp(appSpec) {
        return this.request('/apps', {
            method: 'POST',
            body: JSON.stringify(appSpec),
        });
    }

    async getApp(id) {
        return this.request(`/apps/${id}`);
    }

    async updateApp(id, updateData) {
        return this.request(`/apps/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    async deleteApp(id) {
        return this.request(`/apps/${id}`, {
            method: 'DELETE',
        });
    }

    async getAppLogs(id, params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/apps/${id}/logs?${searchParams}`);
    }

    // Droplets operations
    async getDroplets(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/droplets?${searchParams}`);
    }

    async createDroplet(dropletData) {
        return this.request('/droplets', {
            method: 'POST',
            body: JSON.stringify(dropletData),
        });
    }

    async getDroplet(id) {
        return this.request(`/droplets/${id}`);
    }

    async deleteDroplet(id) {
        return this.request(`/droplets/${id}`, {
            method: 'DELETE',
        });
    }

    // Databases operations
    async getDatabases(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/databases?${searchParams}`);
    }

    async createDatabase(databaseData) {
        return this.request('/databases', {
            method: 'POST',
            body: JSON.stringify(databaseData),
        });
    }

    // Load Balancers operations
    async getLoadBalancers(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/load_balancers?${searchParams}`);
    }

    async createLoadBalancer(lbData) {
        return this.request('/load_balancers', {
            method: 'POST',
            body: JSON.stringify(lbData),
        });
    }

    // Kubernetes operations
    async getKubernetesClusters(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/kubernetes/clusters?${searchParams}`);
    }

    async createKubernetesCluster(clusterData) {
        return this.request('/kubernetes/clusters', {
            method: 'POST',
            body: JSON.stringify(clusterData),
        });
    }

    // Monitoring operations
    async getAlerts(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/monitoring/alerts?${searchParams}`);
    }

    async createAlert(alertData) {
        return this.request('/monitoring/alerts', {
            method: 'POST',
            body: JSON.stringify(alertData),
        });
    }

    // Storage operations
    async getVolumes(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/volumes?${searchParams}`);
    }

    async createVolume(volumeData) {
        return this.request('/volumes', {
            method: 'POST',
            body: JSON.stringify(volumeData),
        });
    }

    // System resources
    async getRegions() {
        return this.request('/regions');
    }

    async getSizes() {
        return this.request('/sizes');
    }

    async getImages(params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/images?${searchParams}`);
    }
}

// Create and export a singleton instance
export const digitalOceanService = new DigitalOceanService();

// Export the class for custom instances
export default DigitalOceanService;
