// File: components/icons/MainNavBarLoginIcon.tsx
import React from 'react';
import { SupportIcon } from './SupportIcon';
import { UserPlusIcon } from './UserPlusIcon';
import { LoginIcon } from './LoginIcon';
import { GestoreLightIcon } from './GestoreLightIcon';
import { IconName, getIconClass, ICON_CATEGORIES } from '@assets/icons';

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
    <div className={"navbar navbar-expand-lg navbar-dark navbar-static"}>
        <div className="navbar-brand ml-2 ml-lg-0">
            <a className="d-inline-block">
                <GestoreLightIcon
                    alt="Inicio"
                />
            </a>
        </div>
        {/* <div className="d-flex justify-content-end align-items-center ml-auto">
            <ul className="navbar-nav flex-row">
                <li className="nav-item">
                    <a href="#" className="navbar-nav-link">
                        <i className={getIconClass('user-plus')} style={{ marginRight: '8px' }} />
                        Registrarse
                    </a>
                </li>
            </ul>
        </div> */}
    </div>
);
