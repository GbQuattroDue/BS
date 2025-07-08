// File: components/icons/MainNavBarLoginIcon.tsx
import React from 'react';
import { SupportIcon } from './SupportIcon';
import { UserPlusIcon } from './UserPlusIcon';
import { LoginIcon } from './LoginIcon';
import { GestoreLightIcon } from './GestoreLightIcon';

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
        <ul className="navbar-brand ml-2 ml-lg-0">
            <li className="d-inline-block">
                <GestoreLightIcon
                    className="navbar-brand-img"
                    alt="Inicio"
                />
            </li>
        </ul>
    </div>
);
