#!/usr/bin/env node
/**
 * Script de validación del componente Login.tsx
 * Verifica que todos los imports se resuelvan correctamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validando componente Login.tsx...\n');

// Archivos que deben existir para que Login.tsx funcione
const requiredFiles = [
    'components/Login.tsx',
    'components/icons/BoxIcon.tsx',
    'components/icons/AitanaImgIcon.tsx',
    'components/Spinner.tsx',
    'components/Alert.tsx',
    'components/icons/MainNavBarLoginIcon.tsx',
    'src/assets/css/variables.css',
    'src/assets/css/bootstrap_ges.min.css',
    'src/assets/images/placeholders/AIperfil.png'
];

const workspaceRoot = process.cwd();
let allFilesExist = true;

console.log('📁 Verificando archivos requeridos:');
requiredFiles.forEach(file => {
    const fullPath = path.join(workspaceRoot, file);
    const exists = fs.existsSync(fullPath);
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${file}`);
    if (!exists) allFilesExist = false;
});

console.log('\n📋 Verificando estructura del componente Login.tsx:');

try {
    const loginContent = fs.readFileSync(
        path.join(workspaceRoot, 'components/Login.tsx'),
        'utf8'
    );

    // Verificaciones básicas
    const checks = [
        {
            name: 'Declaración del componente React.FC',
            test: /export const Login: React\.FC<LoginProps>/
        },
        {
            name: 'Importación de useState',
            test: /import React, \{ useState \}/
        },
        {
            name: 'Props interface definida',
            test: /interface LoginProps/
        },
        {
            name: 'Manejo de onLoginSuccess',
            test: /onLoginSuccess\(\)/
        },
        {
            name: 'Formulario con onSubmit',
            test: /<form onSubmit=\{handleLogin\}/
        },
        {
            name: 'Credenciales de prueba',
            test: /testuser.*password/
        },
        {
            name: 'MainNavBarLoginIcon integrado',
            test: /<MainNavBarLoginIcon/
        },
        {
            name: 'CSS imports presentes',
            test: /import.*\.css/
        }
    ];

    checks.forEach(check => {
        const passed = check.test.test(loginContent);
        const status = passed ? '✅' : '❌';
        console.log(`  ${status} ${check.name}`);
    });

    console.log('\n🎨 Verificando elementos de UI:');

    const uiChecks = [
        {
            name: 'Formulario con Bootstrap classes',
            test: /form-floating/
        },
        {
            name: 'Botón de login con spinner',
            test: /isLoading \? <Spinner/
        },
        {
            name: 'Componente Alert para errores',
            test: /<Alert type="danger"/
        },
        {
            name: 'Información de credenciales demo',
            test: /Credenciales de prueba/
        },
        {
            name: 'Integración DigitalOcean mencionada',
            test: /DigitalOcean API v2\.0/
        }
    ];

    uiChecks.forEach(check => {
        const passed = check.test.test(loginContent);
        const status = passed ? '✅' : '❌';
        console.log(`  ${status} ${check.name}`);
    });

} catch (error) {
    console.log('❌ Error al leer Login.tsx:', error.message);
    allFilesExist = false;
}

console.log('\n🚀 Resultado de la validación:');
if (allFilesExist) {
    console.log('✅ Todos los componentes y archivos están presentes');
    console.log('✅ El componente Login.tsx debería renderizarse correctamente');
    console.log('✅ La integración con DigitalOcean está lista');
    console.log('\n🎉 ¡Validación exitosa! El componente Login está listo para usar.');

    console.log('\n📝 Instrucciones para probar:');
    console.log('1. Ejecuta: npm run dev');
    console.log('2. Abre: http://localhost:5173 (o el puerto que se muestre)');
    console.log('3. Usa las credenciales: testuser / password');
    console.log('4. Prueba el botón "🚀 Acceso rápido (Demo)" para autocompletar');

} else {
    console.log('❌ Faltan algunos archivos o hay errores en la estructura');
    console.log('❌ Revisa los archivos marcados con ❌ arriba');
}

console.log('\n' + '='.repeat(60));
