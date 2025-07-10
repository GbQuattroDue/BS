// components/LoginRegistration.tsx

import React, { useState } from 'react'; // Importa React y el hook useState.
import { AitanaImgIcon } from './icons/AitanaImgIcon'; // Importa el componente Img para manejar imágenes.
import { Spinner } from './Spinner'; // Importa el componente de carga.
import { Alert } from './Alert'; // Importa el componente de alerta para errores.
import { MainNavBarLoginIcon } from './icons/MainNavBarLoginIcon';
import { FooterAnonymous } from './FooterAnonymous'; // Importa el nuevo pie de página.
import { IconName, getIconClass, ICON_CATEGORIES } from '@assets/icons';


// Define las propiedades que el componente Login espera recibir.
interface LoginProps {
    onLoginSuccess: () => void; // Una función que se llamará cuando el login sea exitoso.
    onBackToLogin?: () => void; // Una función opcional para volver al login desde el registro.
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBackToLogin }) => {

    const [name, setName] = useState(''); // Estado para guardar el nombre de usuario introducido.
    const [apellido, setApellido] = useState(''); // Estado para guardar el apellido introducido.
    const [email, setEmail] = useState(''); // Estado para guardar el email introducido.
    const [password, setPassword] = useState(''); // Estado para guardar la contraseña introducida.
    const [telefono, setTelefono] = useState(''); // Estado para guardar el telefono introducido.
    const [telefonoOtro, setTelefonoOtro] = useState(''); // Estado para guardar el telefono otro introducido.
    const [username, setUsername] = useState(''); // Estado para guardar el nombre de cuenta introducido.
    const [error, setError] = useState(''); // Estado para guardar mensajes de error.
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la visibilidad del spinner en el botón.

    // Función que se ejecuta al enviar el formulario.
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue.
        setIsLoading(true); // Muestra el spinner.
        setError(''); // Limpia errores anteriores.

        // Simula una llamada a la API con un retardo de 1 segundo.
        setTimeout(() => {
            // Comprueba las credenciales de prueba.
            if (username === 'testuser' && password === 'password') {
                onLoginSuccess(); // Llama a la función del padre para cambiar el estado.
            } else {
                setError('Credenciales inválidas. Por favor, intente de nuevo.');
            }
            setIsLoading(false); // Oculta el spinner.
        }, 1000);
    };

    // Funciones para manejar los eventos del MainNavBarLoginIcon
    const handleNavLogin = () => {
        // Si hay una función para volver al login, usarla
        if (onBackToLogin) {
            onBackToLogin();
        } else {
            // Auto-completar con credenciales de prueba (comportamiento por defecto)
            setUsername('testuser');
            setPassword('password');
        }
    };

    const handleNavRegister = () => {
        alert('Funcionalidad de registro no implementada. Use: testuser / password');
    };

    const handleNavSupport = () => {
        alert('Soporte: Para acceder use testuser / password');
    };

    // Renderizado del componente con clases de Bootstrap.
    return (
        <div className="page-content content-wrapper content-inner">
            {/* Navbar superior con iconos de login */}
            <div className="d-inline-block" >
                <MainNavBarLoginIcon
                />
            </div>

            {/* Registration form */}
            <main className="page-content content-wrapper content-inner">
                <div className="content d-flex justify-content-center align-items-center">
                    <form className="flex-fill">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <form onSubmit={handleLogin}>
                                            <div className="text-center mb-3">
                                                <div className="rounded-pill">
                                                    <AitanaImgIcon />
                                                </div>
                                                <h5 className="mb-0">Registro de nueva cuenta</h5>
                                                <span className="d-block text-muted">¡ Bienvenido ! Complete los campos requeridos</span>
                                            </div>

                                            {/* Campos del usuario */}
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="name"
                                                            placeholder="Nombre"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('user-check')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="apellido"
                                                            placeholder="Apellido"
                                                            value={apellido}
                                                            onChange={(e) => setApellido(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('user-check')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('envelop3')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('user-lock')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="telefono"
                                                            placeholder="Teléfono con whatsapp"
                                                            value={telefono}
                                                            onChange={(e) => setTelefono(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('mobile')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-feedback form-group-feedback-right">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="telefonootro"
                                                            placeholder="Otro teléfono alternativo"
                                                            value={telefonoOtro}
                                                            onChange={(e) => setTelefonoOtro(e.target.value)}
                                                            required
                                                        />
                                                        <div className="form-control-feedback text-muted">
                                                            <i className={getIconClass('phone')} style={{ marginRight: '8px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card bg-transparent text-right">
                                                <button className="btn btn-teal btn-labeled btn-labeled-right"
                                                    type="submit" disabled={isLoading}>
                                                    {isLoading ? <Spinner /> : 'Crear Cuenta  '}

                                                    <i className={getIconClass('plus3')} />
                                                </button>
                                            </div>

                                            {onBackToLogin && (
                                                <div className="card-footer bg-transparent text-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary btn-light btn-labeled-center btn-sm font-weight-semibold"
                                                        onClick={onBackToLogin}
                                                    >
                                                        Volver al Login
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

function setUsername(value: string): void {
    throw new Error('Function not implemented.');
}

