// File: components/icons/MainNavBarLoginIcon.tsx
import React from 'react';
import { SupportIcon } from './SupportIcon';
import { UserPlusIcon } from './UserPlusIcon';
import { LoginIcon } from './LoginIcon';

interface MainNavBarLoginIconProps {
    className?: string;
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
    onSupportClick?: () => void;
}

export const MainNavBarLoginIcon: React.FC<MainNavBarLoginIconProps> = ({
    className,
    onLoginClick,
    onRegisterClick,
    onSupportClick
}) => (
    <div className={`navbar navbar-expand-lg navbar-dark navbar-static ${className || ''}`}>
        <ul className="navbar-brand ml-2 ml-lg-0">
            <li className="nav-item">
                <img
                    src="../../../../global_assets/images/placeholders/AIperfil.png"
                    className="border-secondary border-3 rounded-pill mb-3 mt-1"
                    alt="Inicio"
                />
            </li>
        </ul>
        <ul className="navbar-nav flex-row">
            <li className="nav-item">
                <button
                    type="button"
                    className="navbar-nav-link btn btn-link"
                    onClick={onRegisterClick}
                    style={{ border: 'none', background: 'none', color: 'inherit' }}
                >
                    <UserPlusIcon width="18" height="18" />
                    <span className="icon-user-plus">Registrarse</span>
                </button>
            </li>
        </ul>
    </div>
);
