// components/FooterAnonymous.tsx
// Este es un nuevo componente para el pie de página de la aplicación.
// Utiliza clases de Bootstrap para el estilo.

import React from 'react';
import { IconName, getIconClass, ICON_CATEGORIES } from '@assets/icons';

// Define las propiedades que el componente FooterAnonymous espera recibir.
interface FooterAnonymousProps {
    onShowRegistration?: () => void; // Función opcional para mostrar el registro
}

export const FooterAnonymous: React.FC<FooterAnonymousProps> = ({ onShowRegistration }) => {
    return (
        <footer className="navbar navbar-expand-lg navbar-light border-bottom-0 border-top">
            <div className="navbar-collapse collapse" id="navbar-footer">
                {/* Sección de copyright a la izquierda */}
                <div className="navbar-text">
                    &copy; 2025 <a href="#">Gestore App</a> is powered by <a href="https://papeleraaitana.com" target="_blank">BSimple.com</a>
                </div>

                {/* Sección de enlaces a la derecha */}
                <ul className="navbar-nav ml-lg-auto float-right">
                    <li className="nav-item">
                        <button
                            type="button"
                            className="navbar-nav-link font-weight-semibold"
                            onClick={onShowRegistration}
                        >
                            <span className="text-success">
                                <i className={getIconClass('user-plus')} style={{ marginRight: '8px' }} />
                                Registrarse
                            </span>
                        </button>
                    </li>

                    <li className="nav-item">
                        <a href="#" className="navbar-nav-link">
                            <i className={getIconClass('file-text')} style={{ marginRight: '8px' }} />
                            Lista de Precios
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="LogiRegistration.tsx" className="navbar-nav-link font-weight-semibold">
                            <span className="text-pink">
                                <i className={getIconClass('cart2')} style={{ marginRight: '8px' }} />
                                Hacer Pedido
                            </span>
                        </a>
                    </li>

                </ul>
            </div>
        </footer >
    );
};
