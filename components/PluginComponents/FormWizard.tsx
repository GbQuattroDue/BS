// components/PluginComponents/FormWizard.tsx
// Componente de wizard de formulario usando Steps plugin

import React, { useRef, useEffect, useState } from 'react';
import { useStepsWizard } from '../../src/hooks/usePlugins';

interface WizardStep {
    title: string;
    content: React.ReactNode;
    validate?: () => boolean | Promise<boolean>;
}

interface FormWizardProps {
    steps: WizardStep[];
    onFinish?: (data: any) => void | Promise<void>;
    className?: string;
    headerTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    bodyTag?: 'div' | 'fieldset' | 'section';
    transitionEffect?: 'none' | 'fade' | 'slide' | 'slideLeft';
    autoFocus?: boolean;
    enableAllSteps?: boolean;
    enableKeyNavigation?: boolean;
    enablePagination?: boolean;
    enableFinishButton?: boolean;
    labels?: {
        cancel?: string;
        current?: string;
        pagination?: string;
        finish?: string;
        next?: string;
        previous?: string;
        loading?: string;
    };
}

export const FormWizard: React.FC<FormWizardProps> = ({
    steps,
    onFinish,
    className = 'wizard',
    headerTag = 'h3',
    bodyTag = 'section',
    transitionEffect = 'slide',
    autoFocus = true,
    enableAllSteps = false,
    enableKeyNavigation = true,
    enablePagination = true,
    enableFinishButton = true,
    labels = {
        cancel: 'Cancelar',
        current: 'Paso actual:',
        pagination: 'Paginación',
        finish: 'Finalizar',
        next: 'Siguiente',
        previous: 'Anterior',
        loading: 'Cargando...'
    }
}) => {
    const wizardRef = useRef<HTMLDivElement>(null);
    const wizardInstanceRef = useRef<any>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const { createWizard, loaded } = useStepsWizard();

    useEffect(() => {
        if (loaded && wizardRef.current && !wizardInstanceRef.current) {
            const wizardElement = wizardRef.current;

            // Limpiar contenido existente
            wizardElement.innerHTML = '';

            // Crear estructura del wizard
            steps.forEach((step, index) => {
                // Crear header
                const header = document.createElement(headerTag);
                header.textContent = step.title;
                wizardElement.appendChild(header);

                // Crear body
                const body = document.createElement(bodyTag);
                body.className = 'wizard-step';
                body.setAttribute('data-step', index.toString());
                wizardElement.appendChild(body);
            });

            // Inicializar el wizard
            wizardInstanceRef.current = createWizard(`#${wizardElement.id || 'wizard'}`, {
                headerTag,
                bodyTag,
                transitionEffect,
                autoFocus,
                enableAllSteps,
                enableKeyNavigation,
                enablePagination,
                enableFinishButton,
                labels,
                onStepChanging: function (event: any, currentIndex: number, newIndex: number) {
                    // Validar paso actual antes de cambiar
                    const currentStepData = steps[currentIndex];
                    if (currentStepData.validate) {
                        const isValid = currentStepData.validate();
                        if (isValid instanceof Promise) {
                            return isValid;
                        }
                        return isValid;
                    }
                    return true;
                },
                onStepChanged: function (event: any, currentIndex: number, priorIndex: number) {
                    setCurrentStep(currentIndex);
                },
                onFinishing: function (event: any, currentIndex: number) {
                    const currentStepData = steps[currentIndex];
                    if (currentStepData.validate) {
                        const isValid = currentStepData.validate();
                        if (isValid instanceof Promise) {
                            return isValid;
                        }
                        return isValid;
                    }
                    return true;
                },
                onFinished: function (event: any, currentIndex: number) {
                    if (onFinish) {
                        onFinish({
                            currentStep: currentIndex,
                            totalSteps: steps.length
                        });
                    }
                }
            });
        }
    }, [loaded, createWizard, steps, headerTag, bodyTag, transitionEffect, autoFocus, enableAllSteps, enableKeyNavigation, enablePagination, enableFinishButton, labels, onFinish]);

    // Renderizar contenido React en los pasos
    useEffect(() => {
        if (wizardRef.current) {
            const stepElements = wizardRef.current.querySelectorAll('.wizard-step');
            stepElements.forEach((element, index) => {
                if (steps[index] && steps[index].content) {
                    // Aquí podrías usar ReactDOM.render para renderizar el contenido React
                    // Por simplicidad, asumimos que el contenido es HTML
                    const content = steps[index].content;
                    if (typeof content === 'string') {
                        element.innerHTML = content;
                    }
                }
            });
        }
    }, [steps, loaded]);

    if (!loaded) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Cargando wizard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title mb-0">Formulario por pasos</h5>
            </div>
            <div className="card-body">
                <div
                    ref={wizardRef}
                    id="wizard"
                    className={className}
                >
                    {/* Los pasos se generan dinámicamente */}
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <h3>{step.title}</h3>
                            <section>
                                {step.content}
                            </section>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
