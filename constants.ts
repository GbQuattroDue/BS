// constants.ts
// Este archivo contiene datos de prueba (mocks) que simulan una base de datos.
// En un entorno de desarrollo, esto nos permite construir y probar el frontend
// sin necesidad de tener un backend funcionando.
// En producción, estos datos serían obtenidos a través de llamadas a la API.

import { Client, Product } from './types'; // Importa las interfaces para asegurar que los datos tengan la estructura correcta.

// Array de clientes de prueba.
export const MOCK_CLIENTS: Client[] = [
    { id: 1, name: 'Innovate Corp', email: 'contact@innovate.com', phone: '555-0101' },
    { id: 2, name: 'Solutions Ltd', email: 'support@solutions.co', phone: '555-0102' },
    { id: 3, name: 'Quantum Group', email: 'hello@quantum.io', phone: '555-0103' },
    { id: 4, name: 'Apex Industries', email: 'info@apex.com', phone: '555-0104' },
];

// Array de productos de prueba.
export const MOCK_PRODUCTS: Product[] = [
    { id: 101, name: 'Pro Keyboard', description: 'Ergonomic mechanical keyboard', price: 129.99 },
    { id: 102, name: '4K Monitor', description: '27-inch UHD IPS display', price: 499.50 },
    { id: 103, name: 'Wireless Mouse', description: 'High-precision laser mouse', price: 75.00 },
    { id: 104, name: 'HD Webcam', description: '1080p webcam with built-in mic', price: 89.95 },
    { id: 105, name: 'USB-C Hub', description: '7-in-1 connectivity hub', price: 59.99 },
];
