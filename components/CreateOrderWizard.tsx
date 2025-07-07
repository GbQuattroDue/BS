// components/CreateOrderWizard.tsx
// Este es el componente principal que guía al usuario a través del proceso de creación de un pedido.
// Se ha actualizado para funcionar sin backend, usando datos de prueba locales.

import React, { useState, useEffect, useCallback } from 'react'; // Importaciones de React y hooks.
import { Client, Product, CartItem } from '../types'; // Importa las interfaces de tipos.
import { MOCK_CLIENTS, MOCK_PRODUCTS } from '../constants'; // Importa los datos de prueba.
import { Spinner } from './Spinner'; // Importa el componente de carga.
import { Alert } from './Alert'; // Importa el componente de alerta para mostrar errores.
import { StepTracker } from './StepTracker'; // Importa el indicador de pasos del wizard.
import { ClientSelector } from './ClientSelector'; // Importa el componente para seleccionar clientes.
import { ProductSelector } from './ProductSelector'; // Importa el componente para seleccionar productos.
import { OrderReview } from './OrderReview'; // Importa el componente para revisar el pedido.
import { CheckCircleIcon } from './icons/CheckCircleIcon'; // Importa el ícono de éxito.

// Define los posibles pasos del wizard.
type WizardStep = 1 | 2 | 3 | 4; // 1: Cliente, 2: Productos, 3: Revisión, 4: Éxito

export const CreateOrderWizard = () => {
    // Estado para el paso actual del wizard.
    const [step, setStep] = useState<WizardStep>(1);
    // Estado para almacenar la lista de clientes.
    const [clients, setClients] = useState<Client[]>([]);
    // Estado para almacenar la lista de productos.
    const [products, setProducts] = useState<Product[]>([]);
    // Estado para controlar la visibilidad del spinner de carga inicial.
    const [isLoading, setIsLoading] = useState(true);
    
    // Estado para el cliente seleccionado.
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    // Estado para el carrito de compras.
    const [cart, setCart] = useState<CartItem[]>([]);
    
    // Estado para mensajes de error.
    const [error, setError] = useState('');
    // Estado para controlar si un pedido se está enviando.
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useEffect se ejecuta cuando el componente se monta para simular la carga de datos.
    useEffect(() => {
        setIsLoading(true);
        setError('');
        // Simula una llamada a la API con un retardo.
        setTimeout(() => {
            setClients(MOCK_CLIENTS);
            setProducts(MOCK_PRODUCTS);
            setIsLoading(false);
        }, 1000); // Retardo de 1 segundo para simular la carga.
    }, []);

    // Función para seleccionar un cliente y avanzar al siguiente paso.
    const handleSelectClient = useCallback((client: Client) => {
        setSelectedClient(client);
        setStep(2);
    }, []);

    // Función para actualizar la cantidad de un producto en el carrito.
    const updateCartItem = useCallback((product: Product, quantity: number) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.product.id === product.id);
            if (quantity <= 0) {
                // Si la cantidad es 0 o menos, elimina el producto del carrito.
                return currentCart.filter(item => item.product.id !== product.id);
            }
            if (existingItem) {
                // Si el producto ya está en el carrito, actualiza su cantidad.
                return currentCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity } : item
                );
            }
            // Si es un producto nuevo, lo añade al carrito.
            return [...currentCart, { product, quantity }];
        });
    }, []);

    // Función para calcular el total del pedido.
    const calculateTotal = useCallback(() => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cart]);

    // Función para simular el envío del pedido.
    const handleSubmitOrder = useCallback(() => {
        if (!selectedClient || cart.length === 0) {
            setError('Se requiere un cliente y al menos un producto.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        // Simula el envío a la API con un retardo.
        setTimeout(() => {
            console.log('Pedido simulado enviado:', {
                clientId: selectedClient.id,
                items: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    priceAtTime: item.product.price
                }))
            });
            setIsSubmitting(false);
            setStep(4); // Avanza al paso de éxito.
        }, 1500); // Retardo de 1.5 segundos.
    }, [selectedClient, cart]);

    // Función para reiniciar el formulario y crear un nuevo pedido.
    const handleReset = () => {
        setStep(1);
        setSelectedClient(null);
        setCart([]);
        setError('');
        setIsSubmitting(false);
    };

    // Muestra un spinner mientras se cargan los datos iniciales.
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '50vh'}}>
                <Spinner />
            </div>
        );
    }
    
    // Muestra un error si algo falla.
    if (error && step !== 4) {
        return <Alert type="danger" message={error} />;
    }

    // Renderiza el contenido del paso actual.
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <ClientSelector clients={clients} onSelectClient={handleSelectClient} />;
            case 2:
                return <ProductSelector products={products} cart={cart} onUpdateCart={updateCartItem} onNext={() => setStep(3)} />;
            case 3:
                return selectedClient && <OrderReview client={selectedClient} cart={cart} total={calculateTotal()} onBack={() => setStep(2)} onSubmit={handleSubmitOrder} isSubmitting={isSubmitting} />;
            case 4:
                return (
                    <div className="text-center py-5">
                        <CheckCircleIcon className="mx-auto h-16 w-16 text-success" style={{height: '4rem', width: '4rem'}} />
                        <h3 className="mt-4 h2">¡Pedido Creado Exitosamente!</h3>
                        <p className="mt-2 text-muted">El pedido para {selectedClient?.name} ha sido registrado.</p>
                        <button
                            onClick={handleReset}
                            className="btn btn-primary btn-lg mt-4"
                        >
                            Crear Otro Pedido
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
                <h2 className="card-title h3 mb-2">Crear Nuevo Pedido</h2>
                <p className="card-subtitle mb-4 text-muted">Sigue los pasos para registrar un nuevo pedido.</p>
                
                {step <= 3 && <StepTracker currentStep={step} />}
                
                <div className="mt-4" style={{minHeight: '300px'}}>
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};
