
// components/OrderReview.tsx
// Componente para el tercer y último paso: revisar y confirmar el pedido.
// Utiliza la grilla y tarjetas de Bootstrap para una presentación clara.

import React from 'react';
import { Client, CartItem } from '../types';
import { Spinner } from './Spinner';

// Define las propiedades que el componente espera.
interface OrderReviewProps {
    client: Client;
    cart: CartItem[];
    total: number;
    onBack: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export const OrderReview: React.FC<OrderReviewProps> = ({ client, cart, total, onBack, onSubmit, isSubmitting }) => {
    return (
        <div>
            <h3 className="h5 mb-4">Paso 3: Revisa y Confirma el Pedido</h3>
            {/* Grilla de Bootstrap para organizar las secciones */}
            <div className="row g-4">
                {/* Columna para los detalles del cliente */}
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0">Detalles del Cliente</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Nombre:</strong> {client.name}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p className="mb-0"><strong>Teléfono:</strong> {client.phone}</p>
                        </div>
                    </div>
                </div>
                {/* Columna para los productos del pedido */}
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-header">
                             <h5 className="mb-0">Productos del Pedido</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {cart.map(item => (
                                <li key={item.product.id} className="list-group-item d-flex justify-content-between">
                                    <div>
                                        <p className="mb-0 fw-medium">{item.product.name}</p>
                                        <p className="text-muted small mb-0">{item.quantity} x ${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <p className="fw-bold mb-0">${(item.quantity * item.product.price).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sección del total del pedido */}
            <div className="mt-4 p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                <span className="h4 mb-0">Total del Pedido:</span>
                <span className="h3 mb-0 text-primary fw-bold">${total.toFixed(2)}</span>
            </div>

            {/* Botones de navegación */}
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <button
                    onClick={onBack}
                    className="btn btn-secondary"
                >
                    Volver a Productos
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="btn btn-success btn-lg d-flex align-items-center"
                >
                    {isSubmitting ? (
                        <>
                            <Spinner size="sm" className="me-2" />
                            <span>Enviando...</span>
                        </>
                    ) : (
                        'Confirmar y Crear Pedido'
                    )}
                </button>
            </div>
        </div>
    );
};
