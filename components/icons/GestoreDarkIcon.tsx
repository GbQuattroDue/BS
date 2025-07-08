// File: components/icons/GestoreDarkIcon.tsx
import React from 'react';

interface GestoreDarkIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const GestoreDarkIcon: React.FC<GestoreDarkIconProps> = ({
    className = "d-inline-block",
    ...props
}) => (
    <img
        src="/src/assets/images/logo_light_dark.png"
        className={className}
        alt="Gestore Inicio"
        {...props}
    />
);