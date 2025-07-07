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

// GET /api/droplets - Listar todos los droplets
router.get('/', async (req, res) => {
    try {
        const {
            page = 1,
            per_page = 20,
            tag_name,
            name
        } = req.query;

        let endpoint = `/droplets?page=${page}&per_page=${per_page}`;

        if (tag_name) {
            endpoint += `&tag_name=${tag_name}`;
        }
        if (name) {
            endpoint += `&name=${name}`;
        }

        const data = await makeDigitalOceanRequest(endpoint, req.digitaloceanToken);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id - Obtener droplet específico
router.get('/:id', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/droplets - Crear nuevo droplet
router.post('/', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/droplets',
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/droplets/:id - Eliminar droplet
router.delete('/:id', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets/${req.params.id}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// DELETE /api/droplets/tag/:tag_name - Eliminar droplets por tag
router.delete('/tag/:tag_name', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets?tag_name=${req.params.tag_name}`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// POST /api/droplets/:id/actions - Ejecutar acción en droplet
router.post('/:id/actions', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/actions`,
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST /api/droplets/actions - Ejecutar acción en múltiples droplets por tag
router.post('/actions', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/droplets/actions',
            req.digitaloceanToken,
            'POST',
            req.body
        );
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/droplets/:id/backups - Listar backups del droplet
router.get('/:id/backups', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/backups?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/snapshots - Listar snapshots del droplet
router.get('/:id/snapshots', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/snapshots?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/kernels - Listar kernels disponibles para el droplet
router.get('/:id/kernels', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/kernels?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/firewalls - Listar firewalls aplicados al droplet
router.get('/:id/firewalls', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/firewalls?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/neighbors - Listar droplets vecinos (mismo servidor físico)
router.get('/:id/neighbors', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/neighbors`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/neighbors - Listar todos los droplets vecinos
router.get('/metadata/neighbors', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/reports/droplet_neighbors_ids?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/destroy_with_associated_resources - Listar recursos asociados
router.get('/:id/destroy_with_associated_resources', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/destroy_with_associated_resources`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/droplets/:id/destroy_with_associated_resources/selective - Eliminar droplet con recursos selectivos
router.delete('/:id/destroy_with_associated_resources/selective', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/destroy_with_associated_resources/selective`,
            req.digitaloceanToken,
            'DELETE',
            req.body
        );
        res.status(202).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/droplets/:id/destroy_with_associated_resources/dangerous - Eliminar droplet y todos los recursos
router.delete('/:id/destroy_with_associated_resources/dangerous', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/destroy_with_associated_resources/dangerous`,
            req.digitaloceanToken,
            'DELETE'
        );
        res.status(202).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/droplets/:id/destroy_with_associated_resources/status - Verificar estado de eliminación
router.get('/:id/destroy_with_associated_resources/status', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/destroy_with_associated_resources/status`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/droplets/:id/destroy_with_associated_resources/retry - Reintentar eliminación
router.post('/:id/destroy_with_associated_resources/retry', async (req, res) => {
    try {
        await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/destroy_with_associated_resources/retry`,
            req.digitaloceanToken,
            'POST'
        );
        res.status(202).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/droplets/backup_policies - Listar políticas de backup soportadas
router.get('/metadata/backup_policies', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            '/droplets/backups/supported_policies',
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/backup_policies/all - Listar todas las políticas de backup
router.get('/backup_policies/all', async (req, res) => {
    try {
        const { page = 1, per_page = 20 } = req.query;
        const data = await makeDigitalOceanRequest(
            `/droplets/backups/policies?page=${page}&per_page=${per_page}`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/droplets/:id/backup_policy - Obtener política de backup del droplet
router.get('/:id/backup_policy', async (req, res) => {
    try {
        const data = await makeDigitalOceanRequest(
            `/droplets/${req.params.id}/backups/policy`,
            req.digitaloceanToken
        );
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
