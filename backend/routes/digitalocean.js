import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const DO_API_BASE_URL = 'https://api.digitalocean.com/v2';

// Helper function para hacer peticiones a la API de DigitalOcean
async function makeDigitalOceanRequest(endpoint, token, method = 'GET', body = null) {
    const url = `${DO_API_BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `DigitalOcean API Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('DigitalOcean API Error:', error);
        throw error;
    }
}

// ====== APPS ENDPOINTS ======

// GET /api/digitalocean/apps - Listar todas las aplicaciones
router.get('/apps', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/apps?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/digitalocean/apps/:id - Obtener una aplicación específica
router.get('/apps/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/digitalocean/apps - Crear nueva aplicación
router.post('/apps', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/apps',
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/digitalocean/apps/:id - Actualizar aplicación
router.put('/apps/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken,
            'PUT',
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/digitalocean/apps/:id - Eliminar aplicación
router.delete('/apps/:id', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/digitalocean/apps/:id/logs - Obtener logs de aplicación
router.get('/apps/:id/logs', async (req, res) => {
    try {
        const { component_name, type = 'BUILD', follow = false } = req.query;
        let endpoint = `/apps/${req.params.id}/logs`;

        if (component_name) {
            endpoint = `/apps/${req.params.id}/components/${component_name}/logs`;
        }

        const params = new URLSearchParams({ type, follow });
        const data = await makeDigitalOceanRequest(
            `${endpoint}?${params}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== DROPLETS ENDPOINTS ======

// GET /api/digitalocean/droplets - Listar todos los droplets
router.get('/droplets', async (req, res) => {
    try {
        const { page = 1, per_page = 20, tag_name } = req.query;
        let endpoint = `/droplets?page=${page}&per_page=${per_page}`;

        if (tag_name) {
            endpoint += `&tag_name=${tag_name}`;
        }

        const data = await makeDigitalOceanRequest(endpoint, req.digitaloceanToken);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/digitalocean/droplets/:id - Obtener droplet específico
router.get('/droplets/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/digitalocean/droplets - Crear nuevo droplet
router.post('/droplets', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/droplets',
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/digitalocean/droplets/:id - Eliminar droplet
router.delete('/droplets/:id', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets/${req.params.id}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== ACCOUNT ENDPOINTS ======

// GET /api/digitalocean/account - Obtener información de la cuenta
router.get('/account', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest('/account', req.digitaloceanToken);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== VOLUMES ENDPOINTS ======

// GET /api/digitalocean/volumes - Listar volúmenes
router.get('/volumes', async (req, res) => {
    try {
        const { page = 1, per_page = 20, region, name } = req.query;
        let endpoint = `/volumes?page=${page}&per_page=${per_page}`;

        if (region) endpoint += `&region=${region}`;
        if (name) endpoint += `&name=${name}`;

        const data = await makeDigitalOceanRequest(endpoint, req.digitaloceanToken);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== LOAD BALANCERS ENDPOINTS ======

// GET /api/digitalocean/load_balancers - Listar load balancers
router.get('/load_balancers', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/load_balancers?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== KUBERNETES ENDPOINTS ======

// GET /api/digitalocean/kubernetes/clusters - Listar clusters de Kubernetes
router.get('/kubernetes/clusters', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/kubernetes/clusters?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== DATABASES ENDPOINTS ======

// GET /api/digitalocean/databases - Listar clusters de base de datos
router.get('/databases', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/databases?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== MONITORING ENDPOINTS ======

// GET /api/digitalocean/monitoring/alert_policies - Listar políticas de alerta
router.get('/monitoring/alert_policies', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/monitoring/alert_policies?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ====== PROJECTS ENDPOINTS ======

// GET /api/digitalocean/projects - Listar proyectos
router.get('/projects', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/projects?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
