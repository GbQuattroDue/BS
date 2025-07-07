
// components/Footer.tsx
// Este es un nuevo componente para el pie de página de la aplicación.
// Utiliza clases de Bootstrap para el estilo.

import React from 'react';

export const Footer = () => {
    return (
        // `mt-auto` empuja el footer al final del contenedor flex.
        // `bg-white` le da un fondo blanco.
        // `border-top` añade una línea de separación sutil.
        <footer className="mt-auto bg-white border-top">
            <div className="container-fluid p-3">
                <div className="row">
                    {/* Sección de copyright a la izquierda */}
                    <div className="col-md-6 text-center text-md-start">
                        <span className="text-muted">&copy; {new Date().getFullYear()} Gestore. Todos los derechos reservados.</span>
                    </div>
                    {/* Sección de enlaces a la derecha */}
                    <div className="col-md-6">
                        <ul className="nav justify-content-center justify-content-md-end">
                            <li className="nav-item">
                                <a href="#" className="nav-link px-2 text-muted">Ayuda</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link px-2 text-muted">Términos de Servicio</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link px-2 text-muted">Política de Privacidad</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};
