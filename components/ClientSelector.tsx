
// components/ClientSelector.tsx
// Componente para el primer paso del wizard: seleccionar un cliente.
// Utiliza el componente List Group de Bootstrap para mostrar la lista.

import React from 'react';
import { Client } from '../types';
import { UserCircleIcon } from './icons/UserCircleIcon';

// Define las propiedades que el componente espera.
interface ClientSelectorProps {
    clients: Client[]; // El array de clientes a mostrar.
    onSelectClient: (client: Client) => void; // La función a llamar cuando se selecciona un cliente.
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({ clients, onSelectClient }) => {
    return (
        <div>
            <h3 className="h5 mb-4">Paso 1: Selecciona un Cliente</h3>
            {/* `list-group` es un componente de Bootstrap para mostrar una serie de elementos. */}
            <div className="list-group">
                {clients.map(client => (
                    // `list-group-item-action` le da estilo de hover y lo hace clickeable.
                    <button
                        key={client.id}
                        type="button"
                        onClick={() => onSelectClient(client)}
                        className="list-group-item list-group-item-action p-3"
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <div className="d-flex align-items-center">
                                {/* Ícono del usuario */}
                                <UserCircleIcon className="text-secondary me-3" style={{ width: '2.5rem', height: '2.5rem' }} />
                                <div>
                                    {/* Nombre del cliente */}
                                    <h5 className="mb-1">{client.name}</h5>
                                    {/* Email del cliente */}
                                    <small className="text-muted">{client.email}</small>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
