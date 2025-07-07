
import React from 'react';

// Define las propiedades del componente Spinner.
interface SpinnerProps {
    // Permite pasar clases adicionales para personalizar el tamaño o color.
    className?: string;
    // Permite definir si es un spinner que crece (puntos) o de borde (círculo).
    type?: 'border' | 'grow';
    // Define el tamaño del spinner.
    size?: 'sm';
}

// Componente Spinner que utiliza las clases de Bootstrap.
export const Spinner: React.FC<SpinnerProps> = ({ className, type = 'border', size }) => {
    // Construye la lista de clases para el spinner.
    const spinnerClass = `spinner-${type}`;
    const sizeClass = size ? `spinner-${type}-${size}` : '';
    
    // Combina todas las clases.
    const combinedClasses = `${spinnerClass} ${sizeClass} ${className || ''}`;

    return (
        <div className={combinedClasses} role="status">
            {/* Texto para lectores de pantalla, mejora la accesibilidad. */}
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};
