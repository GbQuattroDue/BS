
// components/Alert.tsx
// Componente reutilizable para mostrar mensajes de alerta, usando las clases de Bootstrap.

import React from 'react';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';

// Propiedades que el componente Alert espera recibir.
interface AlertProps {
    type: 'success' | 'danger' | 'info'; // Tipo de alerta
    message: string; // Mensaje a mostrar
}

// Configuración de los estilos y el ícono para cada tipo de alerta.
const alertConfig = {
    success: {
        // Clases de Bootstrap para una alerta de éxito.
        class: 'alert-success',
        // Ícono correspondiente.
        icon: <InformationCircleIcon className="flex-shrink-0 me-2" style={{width: '1.5rem', height: '1.5rem'}} />,
    },
    danger: {
        // Clases para una alerta de peligro.
        class: 'alert-danger',
        icon: <ExclamationTriangleIcon className="flex-shrink-0 me-2" style={{width: '1.5rem', height: '1.5rem'}} />,
    },
    info: {
        // Clases para una alerta de información.
        class: 'alert-info',
        icon: <InformationCircleIcon className="flex-shrink-0 me-2" style={{width: '1.5rem', height: '1.5rem'}} />,
    },
};

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
    // Obtiene la configuración correcta según el tipo de alerta.
    const config = alertConfig[type];

    return (
        // El div principal de la alerta.
        // `alert`: clase base de Bootstrap para alertas.
        // `config.class`: clase específica para el color (ej. alert-success).
        // `d-flex align-items-center`: para alinear el ícono y el texto.
        <div className={`alert ${config.class} d-flex align-items-center`} role="alert">
            {/* Renderiza el ícono correspondiente. */}
            {config.icon}
            {/* Contenedor para el mensaje. */}
            <div>
                {message}
            </div>
        </div>
    );
};
