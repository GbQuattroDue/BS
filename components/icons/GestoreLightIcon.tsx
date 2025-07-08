// File: components/icons/GestoreLightIcon.tsx
import React from 'react';

interface GestoreLightIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const GestoreLightIcon: React.FC<GestoreLightIconProps> = ({
    className = "d-inline-block",
    ...props
}) => (
    <img
        src="/src/assets/images/logo_light.png"
        className={className}
        alt="Gestore Inicio"
        {...props}
    />
);