// components/PluginDemo.tsx
// Componente de demostración que muestra el uso de todos los plugins disponibles

import React, { useState } from 'react';
import {
    SweetAlertButton,
    LaddaButton,
    FormWizard,
    useSweetAlert,
    useFormValidation,
    useLadda,
    usePNotify,
    usePluginContext
} from './PluginComponents';

export const PluginDemo: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const { showSuccess, showError, showConfirm } = useSweetAlert();
    const { showNotification } = usePNotify();
    const { availablePlugins, isInitialized } = usePluginContext();

    // Ejemplo de pasos para el wizard
    const wizardSteps = [
        {
            title: 'Información Personal',
            content: (
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
            ),
            validate: () => formData.name.length > 0
        },
        {
            title: 'Contacto',
            content: (
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
            ),
            validate: () => /\S+@\S+\.\S+/.test(formData.email)
        },
        {
            title: 'Mensaje',
            content: (
                <div className="form-group">
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        id="message"
                        className="form-control"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    />
                </div>
            ),
            validate: () => formData.message.length > 10
        }
    ];

    // Funciones de ejemplo
    const handleSweetAlertDemo = async () => {
        const result = await showConfirm(
            '¿Te gusta este demo?',
            'Estamos probando la funcionalidad de SweetAlert'
        );

        if (result.isConfirmed) {
            await showSuccess('¡Genial!', 'Nos alegra que te guste');
        } else {
            await showError('Oh no!', 'Trabajaremos para mejorarlo');
        }
    };

    const handlePNotifyDemo = () => {
        showNotification({
            title: 'Notificación de PNotify',
            text: 'Esta es una notificación no intrusiva',
            type: 'info',
            delay: 3000
        });
    };

    const handleLaddaDemo = async () => {
        // Simular una operación que toma tiempo
        await new Promise(resolve => setTimeout(resolve, 3000));
        await showSuccess('Completado!', 'La operación terminó exitosamente');
    };

    const handleWizardFinish = async (data: any) => {
        console.log('Datos del wizard:', data);
        console.log('Formulario:', formData);

        await showSuccess(
            '¡Wizard Completado!',
            `Datos enviados: ${formData.name}, ${formData.email}`
        );

        // Resetear formulario
        setFormData({ name: '', email: '', message: '' });
    };

    if (!isInitialized) {
        return (
            <div className="text-center p-4">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Inicializando plugins...</span>
                </div>
                <p className="mt-2">Cargando sistema de plugins...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid p-4">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">🔧 Demostración de Plugins</h1>
                    <p className="lead mb-4">
                        Esta página demuestra el uso de todos los plugins disponibles en la aplicación.
                    </p>
                </div>
            </div>

            {/* Información de plugins */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">📋 Estado del Sistema</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Plugins disponibles:</strong> {availablePlugins.length}</p>
                            <div className="row">
                                {availablePlugins.map((plugin, index) => (
                                    <div key={plugin} className="col-md-3 mb-2">
                                        <span className="badge badge-secondary">{plugin}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demos de botones */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">🍯 SweetAlert Demo</h5>
                        </div>
                        <div className="card-body">
                            <p>Ejemplo de alertas modernas y personalizables:</p>

                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={handleSweetAlertDemo}
                                >
                                    Demo Interactivo
                                </button>

                                <SweetAlertButton
                                    className="btn btn-success btn-sm"
                                    onClick={async () => console.log('Acción ejecutada')}
                                    confirmTitle="¿Ejecutar acción?"
                                    confirmText="Esta es una acción de ejemplo"
                                    successTitle="¡Hecho!"
                                    successText="La acción se ejecutó correctamente"
                                    showConfirmation={true}
                                >
                                    Botón con Confirmación
                                </SweetAlertButton>

                                <SweetAlertButton
                                    className="btn btn-warning btn-sm"
                                    onClick={async () => {
                                        throw new Error('Error simulado');
                                    }}
                                    showConfirmation={false}
                                >
                                    Botón que Falla
                                </SweetAlertButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">⚡ Ladda Buttons Demo</h5>
                        </div>
                        <div className="card-body">
                            <p>Botones con indicadores de carga integrados:</p>

                            <div className="d-flex flex-wrap gap-2">
                                <LaddaButton
                                    className="btn btn-primary btn-sm"
                                    onClick={handleLaddaDemo}
                                    style="zoom-in"
                                    loadingText="Procesando..."
                                >
                                    Zoom In
                                </LaddaButton>

                                <LaddaButton
                                    className="btn btn-secondary btn-sm"
                                    onClick={handleLaddaDemo}
                                    style="slide-left"
                                    loadingText="Cargando..."
                                >
                                    Slide Left
                                </LaddaButton>

                                <LaddaButton
                                    className="btn btn-dark btn-sm"
                                    onClick={handleLaddaDemo}
                                    style="expand-right"
                                    loadingText="Expandiendo..."
                                >
                                    Expand Right
                                </LaddaButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo de notificaciones */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">🔔 Notificaciones Demo</h5>
                        </div>
                        <div className="card-body">
                            <p>Diferentes tipos de notificaciones no intrusivas:</p>

                            <div className="d-flex flex-wrap gap-2">
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={handlePNotifyDemo}
                                >
                                    PNotify Info
                                </button>

                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => showNotification({
                                        title: 'Éxito',
                                        text: 'Operación completada',
                                        type: 'success'
                                    })}
                                >
                                    PNotify Success
                                </button>

                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => showNotification({
                                        title: 'Advertencia',
                                        text: 'Revisa esta información',
                                        type: 'warning'
                                    })}
                                >
                                    PNotify Warning
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => showNotification({
                                        title: 'Error',
                                        text: 'Algo salió mal',
                                        type: 'error'
                                    })}
                                >
                                    PNotify Error
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo del wizard */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title mb-0">🧙‍♂️ Form Wizard Demo</h5>
                        </div>
                        <div className="card-body">
                            <p>Formulario por pasos con validación:</p>

                            <FormWizard
                                steps={wizardSteps}
                                onFinish={handleWizardFinish}
                                transitionEffect="slide"
                                enableFinishButton={true}
                                labels={{
                                    finish: 'Enviar Formulario',
                                    next: 'Siguiente →',
                                    previous: '← Anterior',
                                    cancel: 'Cancelar'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="alert alert-info">
                        <h6 className="alert-heading">📚 Información</h6>
                        <p className="mb-0">
                            Para más información sobre cómo usar estos plugins en tus componentes,
                            consulta la documentación en <code>PLUGINS-GUIDE.md</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
