
// components/Sidebar.tsx
// Este es el nuevo componente para el menú lateral de navegación.
// Utiliza clases de Bootstrap para crear una barra lateral oscura y funcional.

import React from 'react';
import { BoxIcon } from './icons/BoxIcon';
import { LayoutDashboardIcon } from './icons/LayoutDashboardIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { UsersIcon } from './icons/UsersIcon';
import { PackageIcon } from './icons/PackageIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { CogIcon } from './icons/CogIcon';

// Define la estructura de un elemento del menú.
interface NavItemProps {
    href: string;
    icon: React.ElementType;
    text: string;
    active?: boolean;
}

// Subcomponente para cada elemento del menú.
const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, text, active }) => (
    <li className="nav-item">
        <a href={href} className={`nav-link d-flex align-items-center ${active ? 'active' : 'text-white'}`}>
            <Icon className="me-3" style={{ width: '20px', height: '20px' }} />
            {text}
        </a>
    </li>
);

export const Sidebar = () => {
    return (
        // Contenedor principal de la barra lateral.
        // `d-flex flex-column`: lo convierte en un contenedor flex vertical.
        // `flex-shrink-0`: evita que se encoja.
        // `p-3 text-white bg-dark`: le da el estilo oscuro.
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar">
            {/* Encabezado con el logo y el nombre de la aplicación */}
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <BoxIcon className="me-2" style={{ width: '40px', height: '32px' }} />
                <span className="fs-4">Gestore</span>
            </a>
            <hr />

            {/* Lista de navegación principal */}
            <ul className="nav nav-pills flex-column mb-auto">
                <NavItem href="#" icon={LayoutDashboardIcon} text="Dashboard" active={true} />
                <NavItem href="#" icon={ClipboardListIcon} text="Pedidos" />
                <NavItem href="#" icon={UsersIcon} text="Clientes" />
                <NavItem href="#" icon={PackageIcon} text="Productos" />
                <NavItem href="#" icon={ChartBarIcon} text="Informes" />
                <NavItem href="#" icon={CogIcon} text="Configuración" />
            </ul>
        </div>
    );
};
