
// components/Modal.tsx
// Componente de Modal genérico y reutilizable, adaptado para Bootstrap.
// Controla la visibilidad con estado de React en lugar de los atributos data-* de Bootstrap,
// lo que ofrece un mejor control en una aplicación React.

import React, { useEffect } from 'react'; // Importa React y useEffect.
import { XMarkIcon } from './icons/XMarkIcon'; // Importa el ícono para el botón de cerrar.

// Define las propiedades que el componente Modal espera recibir.
interface ModalProps {
    isOpen: boolean; // Controla si el modal está visible.
    onClose: () => void; // Función para cerrar el modal.
    children: React.ReactNode; // Contenido del modal.
    title?: string; // Título opcional para el encabezado del modal.
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    // Efecto para añadir/quitar clases al body y manejar el scroll.
    useEffect(() => {
        if (isOpen) {
            // Cuando el modal se abre, se oculta el scroll del body.
            document.body.style.overflow = 'hidden';
        } else {
            // Cuando se cierra, se restaura el scroll.
            document.body.style.overflow = 'unset';
        }
        // Función de limpieza para restaurar el scroll si el componente se desmonta.
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]); // Se ejecuta cada vez que el estado `isOpen` cambia.

    // Si `isOpen` es falso, no renderiza nada.
    if (!isOpen) {
        return null;
    }

    // Renderiza el modal con la estructura de Bootstrap.
    return (
        // El `modal-backdrop` es el fondo oscuro semitransparente.
        <>
            <div className="modal-backdrop fade show"></div>
            {/* Contenedor principal del modal que lo centra y gestiona el scroll interno */}
            <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                onClick={onClose} // Cierra el modal al hacer clic en el fondo.
            >
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    {/* El `modal-content` es el contenedor del contenido visible */}
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            {/* Renderiza el título si se proporciona */}
                            {title && <h5 className="modal-title">{title}</h5>}
                            {/* Botón de cierre de Bootstrap */}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>
                        {/* El cuerpo del modal donde se inserta el contenido (`children`) */}
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
