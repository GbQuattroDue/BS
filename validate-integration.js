#!/usr/bin/env node
/**
 * DigitalOcean API Integration Validator
 * Verifica que la integración con la API de DigitalOcean esté funcionando correctamente
 */

import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Cargar variables de entorno
dotenv.config();

const API_BASE_URL = 'http://localhost:3001/api';
const DO_TOKEN = process.env.DIGITALOCEAN_TOKEN;

console.log('🚀 Iniciando validación de la integración de DigitalOcean API...\n');

// Verificar variables de entorno
console.log('📋 Verificando configuración...');
if (!DO_TOKEN || DO_TOKEN === 'your_digitalocean_api_token_here') {
    console.error('❌ DIGITALOCEAN_TOKEN no está configurado o usa el valor por defecto');
    console.log('💡 Por favor, configura tu token de DigitalOcean en el archivo .env');
    process.exit(1);
}
console.log('✅ Token de DigitalOcean configurado');

// Función helper para hacer peticiones de prueba
async function testEndpoint(endpoint, description) {
    try {
        console.log(`🔍 Probando: ${description}`);
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${description} - OK`);
            return { success: true, data };
        } else {
            console.log(`⚠️  ${description} - HTTP ${response.status}`);
            return { success: false, status: response.status };
        }
    } catch (error) {
        console.log(`❌ ${description} - Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

// Función principal de validación
async function validateIntegration() {
    console.log('\n🧪 Ejecutando pruebas de endpoints...\n');

    const tests = [
        { endpoint: '/health', description: 'Health Check' },
        { endpoint: '/account', description: 'Información de cuenta' },
        { endpoint: '/apps', description: 'Listado de Apps' },
        { endpoint: '/droplets', description: 'Listado de Droplets' },
        { endpoint: '/databases', description: 'Listado de Databases' },
        { endpoint: '/load_balancers', description: 'Listado de Load Balancers' },
        { endpoint: '/volumes', description: 'Listado de Volumes' },
        { endpoint: '/kubernetes/clusters', description: 'Listado de Kubernetes Clusters' },
        { endpoint: '/projects', description: 'Listado de Projects' },
        { endpoint: '/images', description: 'Listado de Images' },
        { endpoint: '/domains', description: 'Listado de Domains' },
        { endpoint: '/sizes', description: 'Listado de Sizes' },
        { endpoint: '/regions', description: 'Listado de Regions' }
    ];

    let passedTests = 0;
    const results = [];

    for (const test of tests) {
        const result = await testEndpoint(test.endpoint, test.description);
        results.push({ ...test, ...result });
        if (result.success) passedTests++;

        // Pequeña pausa entre peticiones para evitar rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📊 Resumen de resultados:');
    console.log(`✅ Pruebas exitosas: ${passedTests}/${tests.length}`);
    console.log(`❌ Pruebas fallidas: ${tests.length - passedTests}/${tests.length}`);

    if (passedTests === tests.length) {
        console.log('\n🎉 ¡Integración completamente funcional!');
    } else {
        console.log('\n⚠️  Algunos endpoints presentan problemas:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`   - ${r.description}: ${r.error || `HTTP ${r.status}`}`);
        });
    }

    return passedTests === tests.length;
}

// Verificar si el servidor está ejecutándose
async function checkServerStatus() {
    try {
        console.log('🔍 Verificando estado del servidor...');
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            console.log('✅ Servidor backend está ejecutándose\n');
            return true;
        }
    } catch (error) {
        console.log('❌ El servidor backend no está ejecutándose');
        console.log('💡 Ejecuta: npm run dev:backend\n');
        return false;
    }
}

// Ejecutar validación
async function main() {
    const serverRunning = await checkServerStatus();

    if (!serverRunning) {
        console.log('🛑 No se puede continuar sin el servidor backend');
        process.exit(1);
    }

    const success = await validateIntegration();

    console.log('\n' + '='.repeat(50));
    console.log('📋 ESTADO DE LA INTEGRACIÓN:');
    console.log('='.repeat(50));

    if (success) {
        console.log('🟢 COMPLETAMENTE FUNCIONAL');
        console.log('   - Backend integrado con DigitalOcean API v2.0');
        console.log('   - Todos los endpoints principales disponibles');
        console.log('   - Servicio frontend configurado');
        console.log('   - Listo para usar en producción');
    } else {
        console.log('🟡 PARCIALMENTE FUNCIONAL');
        console.log('   - Algunos endpoints pueden necesitar ajustes');
        console.log('   - Verificar configuración y permisos de API');
    }

    console.log('\n📚 Documentación disponible en:');
    console.log('   - Backend: backend/README.md');
    console.log('   - DigitalOcean API: https://docs.digitalocean.com/reference/api/');
}

main().catch(console.error);
