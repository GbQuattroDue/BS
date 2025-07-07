
// components/StepTracker.tsx
// Un componente visual para mostrar el progreso a través de los pasos de un proceso.
// Ha sido adaptado para usar clases de Bootstrap.

import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { ShoppingBagIcon } from './icons/ShoppingBagIcon';
import { DocumentCheckIcon } from './icons/DocumentCheckIcon';

// Define las propiedades que el componente espera.
interface StepTrackerProps {
    currentStep: number; // El número del paso actual.
}

// Define la información de cada paso.
const steps = [
    { id: 1, name: 'Seleccionar Cliente', icon: UserIcon },
    { id: 2, name: 'Añadir Productos', icon: ShoppingBagIcon },
    { id: 3, name: 'Revisar y Confirmar', icon: DocumentCheckIcon },
];

export const StepTracker: React.FC<StepTrackerProps> = ({ currentStep }) => {
    return (
        <nav aria-label="Progress">
            <ol className="d-flex justify-content-between list-unstyled p-0 m-0 position-relative">
                {/* Línea de progreso de fondo */}
                <div className="position-absolute top-50 start-0 w-100 translate-middle-y" style={{ height: '2px', backgroundColor: '#e9ecef', zIndex: 0 }}></div>
                {/* Línea de progreso activa */}
                <div 
                    className="position-absolute top-50 start-0 translate-middle-y" 
                    style={{ 
                        height: '2px', 
                        backgroundColor: '#0d6efd', 
                        zIndex: 1, 
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        transition: 'width 0.3s ease-in-out'
                    }}>
                </div>

                {steps.map((step) => {
                    const isCompleted = step.id < currentStep;
                    const isCurrent = step.id === currentStep;

                    // Determina las clases de Bootstrap según el estado del paso.
                    const circleClass = isCompleted 
                        ? 'bg-primary border-primary text-white' 
                        : isCurrent 
                        ? 'bg-white border-primary' 
                        : 'bg-white border-light-subtle';
                    
                    const iconClass = isCompleted ? 'text-white' : 'text-primary';
                    const textClass = isCurrent ? 'text-primary fw-bold' : 'text-muted';

                    return (
                        <li key={step.name} className="text-center position-relative" style={{ zIndex: 2 }}>
                            <div className={`d-flex align-items-center justify-content-center rounded-circle border ${circleClass}`} style={{ width: '40px', height: '40px', borderWidth: '2px !important' }}>
                                <step.icon className={`h-5 w-5 ${iconClass}`} style={{width: '20px', height: '20px'}} />
                            </div>
                            <span className={`d-block mt-2 small ${textClass}`}>{step.name}</span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
