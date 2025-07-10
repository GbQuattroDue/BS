// components/PluginComponents/SweetAlertButton.tsx
// Componente de botón que usa SweetAlert para confirmaciones

import React from 'react';
import { useSweetAlert } from '../../src/hooks/usePlugins';

interface SweetAlertButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void | Promise<void>;
    confirmTitle?: string;
    confirmText?: string;
    successTitle?: string;
    successText?: string;
    showConfirmation?: boolean;
    disabled?: boolean;
}

export const SweetAlertButton: React.FC<SweetAlertButtonProps> = ({
    children,
    className = 'btn btn-primary',
    onClick,
    confirmTitle = '¿Estás seguro?',
    confirmText = 'Esta acción no se puede deshacer',
    successTitle = '¡Éxito!',
    successText = 'La acción se completó correctamente',
    showConfirmation = false,
    disabled = false
}) => {
    const { showConfirm, showSuccess, showError, loaded } = useSweetAlert();

    const handleClick = async () => {
        if (!loaded) {
            console.warn('SweetAlert not loaded, executing action directly');
            if (onClick) {
                try {
                    await onClick();
                } catch (error) {
                    console.error('Action failed:', error);
                }
            }
            return;
        }

        try {
            if (showConfirmation) {
                const result = await showConfirm(confirmTitle, confirmText);
                if (!result.isConfirmed) {
                    return;
                }
            }

            if (onClick) {
                await onClick();
                await showSuccess(successTitle, successText);
            }
        } catch (error) {
            await showError('Error', 'Ocurrió un error al ejecutar la acción');
            console.error('Action failed:', error);
        }
    };

    return (
        <button
            className={className}
            onClick={handleClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
