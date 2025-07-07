
// components/ProductSelector.tsx
// Componente para el segundo paso: añadir productos al pedido.
// Utiliza la grilla y otros componentes de Bootstrap para el layout.

import React from 'react';
import { Product, CartItem } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';

// Propiedades que el componente espera.
interface ProductSelectorProps {
    products: Product[];
    cart: CartItem[];
    onUpdateCart: (product: Product, quantity: number) => void;
    onNext: () => void;
}

// Subcomponente para los controles de cantidad (+/-).
const QuantityControl: React.FC<{
    item: CartItem | undefined;
    product: Product;
    onUpdateCart: (product: Product, quantity: number) => void;
}> = ({ item, product, onUpdateCart }) => {
    const quantity = item?.quantity ?? 0;

    const handleDecrement = () => {
        if (quantity > 0) {
            onUpdateCart(product, quantity - 1);
        }
    };

    const handleIncrement = () => {
        onUpdateCart(product, quantity + 1);
    };

    return (
        <div className="input-group" style={{ width: '120px' }}>
            <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement} disabled={quantity === 0}>
                <MinusIcon className="h-4 w-4" style={{width:'16px', height:'16px'}}/>
            </button>
            <span className="input-group-text text-center" style={{ minWidth: '40px' }}>{quantity}</span>
            <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>
                <PlusIcon className="h-4 w-4" style={{width:'16px', height:'16px'}} />
            </button>
        </div>
    );
};

export const ProductSelector: React.FC<ProductSelectorProps> = ({ products, cart, onUpdateCart, onNext }) => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        // Utiliza la grilla de Bootstrap para el layout responsivo.
        <div className="row g-4">
            {/* Columna de la lista de productos */}
            <div className="col-lg-8">
                <h3 className="h5 mb-4">Paso 2: Añade Productos al Pedido</h3>
                <ul className="list-group">
                    {products.map((product) => (
                        <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                            <div>
                                <h6 className="my-0">{product.name}</h6>
                                <small className="text-muted">${product.price.toFixed(2)}</small>
                            </div>
                            <QuantityControl item={cart.find(i => i.product.id === product.id)} product={product} onUpdateCart={onUpdateCart} />
                        </li>
                    ))}
                </ul>
            </div>
            {/* Columna del resumen del pedido */}
            <div className="col-lg-4">
                 <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
                    <div className="card-body">
                        <h4 className="card-title d-flex align-items-center h5">
                            <ShoppingCartIcon className="text-primary me-2" style={{width:'24px', height:'24px'}}/>
                            Resumen del Pedido
                        </h4>
                        {cart.length === 0 ? (
                             <p className="text-muted mt-3">Tu carrito está vacío. Añade productos de la lista.</p>
                        ) : (
                            <>
                                <ul className="list-group list-group-flush mt-3" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                    {cart.map(item => (
                                        <li key={item.product.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <div>
                                                <p className="mb-0 small">{item.product.name}</p>
                                                <p className="text-muted mb-0 small">x {item.quantity}</p>
                                            </div>
                                            <span className="fw-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                                            <button onClick={() => onUpdateCart(item.product, 0)} className="btn btn-sm btn-outline-danger ms-2">
                                                <TrashIcon style={{width:'16px', height:'16px'}} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3 pt-3 border-top">
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total</span>
                                        <span>${cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </>
                        )}
                        <button
                            onClick={onNext}
                            disabled={totalItems === 0}
                            className="btn btn-primary w-100 mt-3"
                        >
                            Revisar Pedido
                        </button>
                    </div>
                 </div>
            </div>
        </div>
    );
};
