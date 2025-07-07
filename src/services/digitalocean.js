// DigitalOcean Service
// Compatible con la API de DigitalOcean v2.0

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class DigitalOceanService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Helper method para hacer peticiones HTTP
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

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
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            // Handle 204 No Content responses
            if (response.status === 204) {
                return { success: true };
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`DigitalOcean Service Error [${endpoint}]:`, error.message);
            throw error;
        }
    }

    // ===== HEALTH & ACCOUNT =====

    async getHealth() {
        return this.makeRequest('/health');
    }

    async getAccount() {
        return this.makeRequest('/account');
    }

    // ===== APPS PLATFORM =====

    async getApps(params = {}) {
        const { page = 1, per_page = 20, with_projects = false } = params;
        const queryParams = new URLSearchParams({ page, per_page, with_projects });
        return this.makeRequest(`/apps?${queryParams}`);
    }

    async createApp(appSpec) {
        return this.makeRequest('/apps', {
            method: 'POST',
            body: JSON.stringify(appSpec),
        });
    }

    async getApp(appId) {
        return this.makeRequest(`/apps/${appId}`);
    }

    async updateApp(appId, updateData) {
        return this.makeRequest(`/apps/${appId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
        });
    }

    async deleteApp(appId) {
        return this.makeRequest(`/apps/${appId}`, {
            method: 'DELETE',
        });
    }

    async getAppLogs(appId, params = {}) {
        const { type = 'BUILD', follow = false } = params;
        const queryParams = new URLSearchParams({ type, follow });
        return this.makeRequest(`/apps/${appId}/logs?${queryParams}`);
    }

    async getAppDeployments(appId, params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/apps/${appId}/deployments?${queryParams}`);
    }

    async createAppDeployment(appId, deploymentData = {}) {
        return this.makeRequest(`/apps/${appId}/deployments`, {
            method: 'POST',
            body: JSON.stringify(deploymentData),
        });
    }

    async getAppRegions() {
        return this.makeRequest('/apps/regions');
    }

    // ===== DROPLETS =====

    async getDroplets(params = {}) {
        const { page = 1, per_page = 20, tag_name } = params;
        let queryParams = new URLSearchParams({ page, per_page });
        if (tag_name) queryParams.append('tag_name', tag_name);
        return this.makeRequest(`/droplets?${queryParams}`);
    }

    async createDroplet(dropletData) {
        return this.makeRequest('/droplets', {
            method: 'POST',
            body: JSON.stringify(dropletData),
        });
    }

    async getDroplet(dropletId) {
        return this.makeRequest(`/droplets/${dropletId}`);
    }

    async deleteDroplet(dropletId) {
        return this.makeRequest(`/droplets/${dropletId}`, {
            method: 'DELETE',
        });
    }

    async getDropletActions(dropletId, params = {}) {
        const { page = 1, per_page = 25 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/droplets/${dropletId}/actions?${queryParams}`);
    }

    async performDropletAction(dropletId, actionData) {
        return this.makeRequest(`/droplets/${dropletId}/actions`, {
            method: 'POST',
            body: JSON.stringify(actionData),
        });
    }

    // ===== DATABASES =====

    async getDatabases(params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/databases?${queryParams}`);
    }

    async createDatabase(databaseData) {
        return this.makeRequest('/databases', {
            method: 'POST',
            body: JSON.stringify(databaseData),
        });
    }

    async getDatabase(databaseId) {
        return this.makeRequest(`/databases/${databaseId}`);
    }

    // ===== LOAD BALANCERS =====

    async getLoadBalancers(params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/load_balancers?${queryParams}`);
    }

    async createLoadBalancer(lbData) {
        return this.makeRequest('/load_balancers', {
            method: 'POST',
            body: JSON.stringify(lbData),
        });
    }

    // ===== VOLUMES =====

    async getVolumes(params = {}) {
        const { page = 1, per_page = 20, region, name } = params;
        let queryParams = new URLSearchParams({ page, per_page });
        if (region) queryParams.append('region', region);
        if (name) queryParams.append('name', name);
        return this.makeRequest(`/volumes?${queryParams}`);
    }

    async createVolume(volumeData) {
        return this.makeRequest('/volumes', {
            method: 'POST',
            body: JSON.stringify(volumeData),
        });
    }

    // ===== KUBERNETES =====

    async getKubernetesClusters(params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/kubernetes/clusters?${queryParams}`);
    }

    async createKubernetesCluster(clusterData) {
        return this.makeRequest('/kubernetes/clusters', {
            method: 'POST',
            body: JSON.stringify(clusterData),
        });
    }

    // ===== MONITORING =====

    async getDropletMetrics(metric, params = {}) {
        const { host_id, start, end, interface: iface, direction } = params;
        let queryParams = new URLSearchParams({ host_id, start, end });
        if (iface) queryParams.append('interface', iface);
        if (direction) queryParams.append('direction', direction);
        return this.makeRequest(`/monitoring/metrics/droplet/${metric}?${queryParams}`);
    }

    // ===== PROJECTS =====

    async getProjects(params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/projects?${queryParams}`);
    }

    async createProject(projectData) {
        return this.makeRequest('/projects', {
            method: 'POST',
            body: JSON.stringify(projectData),
        });
    }

    // ===== IMAGES =====

    async getImages(params = {}) {
        const { page = 1, per_page = 20, type, private: isPrivate } = params;
        let queryParams = new URLSearchParams({ page, per_page });
        if (type) queryParams.append('type', type);
        if (isPrivate) queryParams.append('private', isPrivate);
        return this.makeRequest(`/images?${queryParams}`);
    }

    // ===== DOMAINS =====

    async getDomains(params = {}) {
        const { page = 1, per_page = 20 } = params;
        const queryParams = new URLSearchParams({ page, per_page });
        return this.makeRequest(`/domains?${queryParams}`);
    }

    async createDomain(domainData) {
        return this.makeRequest('/domains', {
            method: 'POST',
            body: JSON.stringify(domainData),
        });
    }

    // ===== SIZES AND REGIONS =====

    async getSizes() {
        return this.makeRequest('/sizes');
    }

    async getRegions() {
        return this.makeRequest('/regions');
    }

    // ===== UTILITY METHODS =====

    // Get all available options for creating resources
    async getResourceOptions() {
        try {
            const [sizes, regions, images] = await Promise.all([
                this.getSizes(),
                this.getRegions(),
                this.getImages({ type: 'distribution' })
            ]);

            return {
                sizes: sizes.sizes || [],
                regions: regions.regions || [],
                images: images.images || []
            };
        } catch (error) {
            console.error('Error fetching resource options:', error);
            throw error;
        }
    }

    // Get dashboard data
    async getDashboardData() {
        try {
            const [account, apps, droplets, databases] = await Promise.all([
                this.getAccount(),
                this.getApps({ per_page: 5 }),
                this.getDroplets({ per_page: 5 }),
                this.getDatabases({ per_page: 5 })
            ]);

            return {
                account: account.account,
                apps: apps.apps || [],
                droplets: droplets.droplets || [],
                databases: databases.databases || [],
                summary: {
                    totalApps: apps.meta?.total || 0,
                    totalDroplets: droplets.meta?.total || 0,
                    totalDatabases: databases.meta?.total || 0
                }
            };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new DigitalOceanService();
