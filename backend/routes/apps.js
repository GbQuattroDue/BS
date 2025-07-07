import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const DO_API_BASE_URL = 'https://api.digitalocean.com/v2';

// Helper function
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

// GET /api/apps - Listar todas las aplicaciones App Platform
router.get('/', async (req, res) => {
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

// GET /api/apps/:id - Obtener detalles de una aplicación específica
router.get('/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/apps - Crear nueva aplicación en App Platform
router.post('/', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/apps',
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/apps/:id - Actualizar aplicación existente
router.put('/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken,
            'PUT',
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/apps/:id - Eliminar aplicación
router.delete('/:id', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/apps/${req.params.id}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/apps/:id/restart - Reiniciar aplicación
router.post('/:id/restart', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/restart`,
            req.digitaloceanToken,
            'POST'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/:id/logs - Obtener logs de la aplicación
router.get('/:id/logs', async (req, res) => {
    try {
        const {
            component_name,
            type = 'BUILD',
            follow = false,
            pod_connection_timeout = '3m'
        } = req.query;

        let endpoint = `/apps/${req.params.id}/logs`;

        if (component_name) {
            endpoint = `/apps/${req.params.id}/components/${component_name}/logs`;
        }

        const params = new URLSearchParams({
            type,
            follow: follow.toString(),
            pod_connection_timeout
        });

        const data = await makeDigitalOceanRequest(
            `${endpoint}?${params}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/:id/deployments - Listar deployments de la aplicación
router.get('/:id/deployments', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/deployments?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/apps/:id/deployments - Crear nuevo deployment
router.post('/:id/deployments', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/deployments`,
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/apps/:id/deployments/:deployment_id - Obtener deployment específico
router.get('/:id/deployments/:deployment_id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/deployments/${req.params.deployment_id}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE /api/apps/:id/deployments/:deployment_id - Cancelar deployment
router.delete('/:id/deployments/:deployment_id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/deployments/${req.params.deployment_id}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/:id/instances - Obtener instancias de la aplicación
router.get('/:id/instances', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/instances`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/:id/health - Obtener estado de salud de la aplicación
router.get('/:id/health', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/health`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/:id/alerts - Listar alertas de la aplicación
router.get('/:id/alerts', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/alerts`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/apps/:id/rollback - Rollback de la aplicación
router.post('/:id/rollback', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/rollback`,
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST /api/apps/:id/rollback/commit - Confirmar rollback
router.post('/:id/rollback/commit', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/rollback/commit`,
            req.digitaloceanToken,
            'POST'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/apps/:id/rollback/revert - Revertir rollback
router.post('/:id/rollback/revert', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/apps/${req.params.id}/rollback/revert`,
            req.digitaloceanToken,
            'POST'
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/regions - Listar regiones disponibles para App Platform
router.get('/metadata/regions', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/apps/regions',
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/apps/tiers/instance_sizes - Listar tamaños de instancia disponibles
router.get('/metadata/instance_sizes', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/apps/tiers/instance_sizes',
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
