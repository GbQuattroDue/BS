import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Import route modules
import appsRoutes from './routes/apps.js';
import dropletsRoutes from './routes/droplets.js';
import digitaloceanRoutes from './routes/digitalocean.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PORT = process.env.DB_PORT || 25060;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// DigitalOcean API configuration
const DO_API_BASE_URL = 'https://api.digitalocean.com/v2';
const DO_API_TOKEN = process.env.DIGITALOCEAN_TOKEN;

// Validate environment variables
if (!DO_API_TOKEN) {
    console.error('ERROR: DIGITALOCEAN_TOKEN environment variable is required');
    process.exit(1);
}

// Enhanced helper function to make DigitalOcean API requests
async function makeDigitalOceanRequest(endpoint, method = 'GET', body = null, options = {}) {
    const url = `${DO_API_BASE_URL}${endpoint}`;

    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DO_API_TOKEN}`,
            'User-Agent': 'DigitalOcean-OrderManagement/1.0',
            ...options.headers
        }
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        console.log(`Making ${method} request to: ${url}`);
        const response = await fetch(url, requestOptions);

        // Handle rate limiting
        if (response.status === 429) {
            const retryAfter = response.headers.get('retry-after') || '60';
            throw new Error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
        }

        // Some endpoints return 204 with no content
        if (response.status === 204) {
            return { success: true, status: 204 };
        }

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error(`DigitalOcean API Error ${response.status}:`, responseData);
            throw new Error(`${response.status}: ${responseData.message || responseData.error_message || response.statusText}`);
        }

        // Add response metadata
        return {
            ...responseData,
            _meta: {
                status: response.status,
                rateLimit: {
                    limit: response.headers.get('ratelimit-limit'),
                    remaining: response.headers.get('ratelimit-remaining'),
                    reset: response.headers.get('ratelimit-reset')
                }
            }
        };
    } catch (error) {
        console.error('DigitalOcean API Request Error:', error.message);
        throw error;
    }
}

// Middleware to validate and inject DigitalOcean token
const validateToken = (req, res, next) => {
    if (!DO_API_TOKEN) {
        return res.status(500).json({
            error: 'DigitalOcean API token not configured'
        });
    }
    // Inject the token into the request object for use in routes
    req.digitaloceanToken = DO_API_TOKEN;
    next();
};

// Apply token validation to all API routes
app.use('/api', validateToken);

// Use route modules
app.use('/api/apps', appsRoutes);
app.use('/api/droplets', dropletsRoutes);
app.use('/api/digitalocean', digitaloceanRoutes);

// Routes

// Health check with enhanced information
app.get('/api/health', async (req, res) => {
    try {
        // Test DigitalOcean API connectivity
        const accountData = await makeDigitalOceanRequest('/account');
        res.json({
            status: 'OK',
            message: 'DigitalOcean Backend Service is running',
            digitalocean: {
                connected: true,
                account: accountData.account?.email || 'Connected'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'DigitalOcean API connection failed',
            error: error.message,
            digitalocean: { connected: false },
            timestamp: new Date().toISOString()
        });
    }
});

// Account Information
app.get('/api/account', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest('/account');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== APPS PLATFORM =====

// List all apps
app.get('/api/apps', async (req, res) => {
    try {
        const { page = 1, per_page = 20, with_projects = false } = req.query;
        const params = new URLSearchParams({ page, per_page, with_projects });
        const data = await makeDigitalOceanRequest(`/apps?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new app
app.post('/api/apps', async (req, res) => {
    try {
        const appSpec = req.body;
        const data = await makeDigitalOceanRequest('/apps', 'POST', appSpec);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific app
app.get('/api/apps/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await makeDigitalOceanRequest(`/apps/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update app
app.put('/api/apps/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const data = await makeDigitalOceanRequest(`/apps/${id}`, 'PUT', updateData);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete app
app.delete('/api/apps/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await makeDigitalOceanRequest(`/apps/${id}`, 'DELETE');
        res.status(204).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get app logs
app.get('/api/apps/:id/logs', async (req, res) => {
    try {
        const { id } = req.params;
        const { type = 'BUILD', follow = false } = req.query;
        const params = new URLSearchParams({ type, follow });
        const data = await makeDigitalOceanRequest(`/apps/${id}/logs?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get app deployments
app.get('/api/apps/:id/deployments', async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, per_page = 20 } = req.query;
        const params = new URLSearchParams({ page, per_page });
        const data = await makeDigitalOceanRequest(`/apps/${id}/deployments?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create app deployment
app.post('/api/apps/:id/deployments', async (req, res) => {
    try {
        const { id } = req.params;
        const deploymentData = req.body;
        const data = await makeDigitalOceanRequest(`/apps/${id}/deployments`, 'POST', deploymentData);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get app regions
app.get('/api/apps/regions', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest('/apps/regions');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== DROPLETS =====

// List all droplets
app.get('/api/droplets', async (req, res) => {
    try {
        const { page = 1, per_page = 20, tag_name } = req.query;
        let endpoint = `/droplets?page=${page}&per_page=${per_page}`;
        if (tag_name) {
            endpoint += `&tag_name=${encodeURIComponent(tag_name)}`;
        }
        const data = await makeDigitalOceanRequest(endpoint);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new droplet
app.post('/api/droplets', async (req, res) => {
    try {
        const dropletData = req.body;
        const data = await makeDigitalOceanRequest('/droplets', 'POST', dropletData);
        res.status(202).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get specific droplet
app.get('/api/droplets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await makeDigitalOceanRequest(`/droplets/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete droplet
app.delete('/api/droplets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await makeDigitalOceanRequest(`/droplets/${id}`, 'DELETE');
        res.status(204).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get droplet actions
app.get('/api/droplets/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, per_page = 25 } = req.query;
        const params = new URLSearchParams({ page, per_page });
        const data = await makeDigitalOceanRequest(`/droplets/${id}/actions?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Perform droplet action
app.post('/api/droplets/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        const actionData = req.body;
        const data = await makeDigitalOceanRequest(`/droplets/${id}/actions`, 'POST', actionData);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== DATABASES =====

// List all databases
app.get('/api/databases', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const params = new URLSearchParams({ page, per_page });
        const data = await makeDigitalOceanRequest(`/databases?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get specific database
app.get('/api/databases/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await makeDigitalOceanRequest(`/databases/${id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ===== IMAGES =====

// List all images
app.get('/api/images', async (req, res) => {
    try {
        const { page = 1, per_page = 20, type, private: isPrivate } = req.query;
        let endpoint = `/images?page=${page}&per_page=${per_page}`;
        if (type) endpoint += `&type=${type}`;
        if (isPrivate) endpoint += `&private=${isPrivate}`;
        const data = await makeDigitalOceanRequest(endpoint);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== DOMAINS =====

// List all domains
app.get('/api/domains', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const params = new URLSearchParams({ page, per_page });
        const data = await makeDigitalOceanRequest(`/domains?${params}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ===== SIZES AND REGIONS =====


// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// Export the helper function for use in route modules
export { makeDigitalOceanRequest };

// Start server
app.listen(PORT, () => {
    console.log(`🚀 DigitalOcean Backend Server running on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🌊 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (DO_API_TOKEN) {
        console.log('✅ DigitalOcean API token configured');
    } else {
        console.log('❌ DigitalOcean API token not configured');
    }
});
