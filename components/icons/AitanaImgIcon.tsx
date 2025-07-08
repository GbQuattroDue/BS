import React from 'react';

interface AitanaImgIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const AitanaImgIcon: React.FC<AitanaImgIconProps> = ({
    className = "border-secondary border-3 rounded-pill mb-3 mt-1",
    ...props
}) => (
    <img
        src="/src/assets/images/placeholders/AIperfil.png"
        className={className}
        alt="Aitana perfil"
        {...props}
    />
);