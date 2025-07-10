// components/PluginComponents/LaddaButton.tsx
// Componente de botón con indicador de carga usando Ladda

import React, { useRef, useEffect, useState } from 'react';
import { useLadda } from '../../src/hooks/usePlugins';

interface LaddaButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void | Promise<void>;
    disabled?: boolean;
    loadingText?: string;
    spinnerSize?: number;
    spinnerColor?: string;
    style?: 'expand-left' | 'expand-right' | 'expand-up' | 'expand-down' | 'contract' | 'zoom-in' | 'zoom-out' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down';
}

export const LaddaButton: React.FC<LaddaButtonProps> = ({
    children,
    className = 'btn btn-primary',
    onClick,
    disabled = false,
    loadingText = 'Cargando...',
    spinnerSize = 20,
    spinnerColor = '#ffffff',
    style = 'zoom-in'
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const laddaInstanceRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { createButton, loaded } = useLadda();

    useEffect(() => {
        if (loaded && buttonRef.current && !laddaInstanceRef.current) {
            laddaInstanceRef.current = createButton(buttonRef.current, {
                style,
                spinnerSize,
                spinnerColor
            });
        }
    }, [loaded, createButton, style, spinnerSize, spinnerColor]);

    const handleClick = async () => {
        if (!onClick || isLoading) return;

        setIsLoading(true);

        if (laddaInstanceRef.current) {
            laddaInstanceRef.current.start();
        }

        try {
            await onClick();
        } catch (error) {
            console.error('Button action failed:', error);
        } finally {
            setIsLoading(false);
            if (laddaInstanceRef.current) {
                laddaInstanceRef.current.stop();
            }
        }
    };

    return (
        <button
            ref={buttonRef}
            className={`${className} ladda-button`}
            onClick={handleClick}
            disabled={disabled || isLoading}
            data-style={style}
            data-spinner-size={spinnerSize}
            data-spinner-color={spinnerColor}
        >
            <span className="ladda-label">
                {isLoading && !loaded ? loadingText : children}
            </span>
        </button>
    );
};
