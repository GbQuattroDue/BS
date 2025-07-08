// components/Login.tsx
// Este componente gestiona la pantalla y la lógica de inicio de sesión.
// Se ha actualizado para usar credenciales de prueba locales y no depender de un backend.

import React, { useState } from 'react'; // Importa React y el hook useState.
import { GestoreLightIcon } from './icons/GestoreLightIcon'; // Importa el ícono para el logo.
import { AitanaImgIcon } from './icons/AitanaImgIcon'; // Importa el componente Img para manejar imágenes.
import { Spinner } from './Spinner'; // Importa el componente de carga.
import { Alert } from './Alert'; // Importa el componente de alerta para errores.
import { MainNavBarLoginIcon } from './icons/MainNavBarLoginIcon';


// Define las propiedades que el componente Login espera recibir.
interface LoginProps {
    onLoginSuccess: () => void; // Una función que se llamará cuando el login sea exitoso.
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    // Estado para guardar el nombre de usuario introducido.
    const [username, setUsername] = useState('');
    // Estado para guardar la contraseña introducida.
    const [password, setPassword] = useState('');
    // Estado para guardar mensajes de error.
    const [error, setError] = useState('');
    // Estado para controlar la visibilidad del spinner en el botón.
    const [isLoading, setIsLoading] = useState(false);

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
        // Auto-completar con credenciales de prueba
        setUsername('testuser');
        setPassword('password');
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

            <main className="content d-flex justify-content-center align-items-center">
                <div className="login-form">
                    <div className=" card mb-0 card-body">
                        <form onSubmit={handleLogin}>
                            <div className="text-center mb-3">
                                <div className="rounded-pill">
                                    <AitanaImgIcon />
                                </div>
                                <h5 className="mb-0">Bienvenido a Gestore</h5>
                                <span className="d-block text-muted">Inicia sesión para gestionar tus pedidos</span>
                            </div>

                            {/* Muestra un error si el login falla */}
                            {error && <div className="mt-3"><Alert type="danger" message={error} /></div>}

                            {/* Campo de usuario con `form-floating` de Bootstrap */}
                            <div className="form-group form-group-feedback form-group-feedback-left">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Tu email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <div className="form-control-feedback">
                                    <i className="icon-envelop3 text-muted"></i>
                                </div>
                            </div>

                            {/* Campo de contraseña con `form-floating` */}
                            <div className="form-group form-group-feedback form-group-feedback-left">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña (password)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                            </div>

                            <button className="form-group btn btn-primary btn-block"
                                type="submit" disabled={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Ingresar'}
                            </button>

                            <button className="form-group btn btn-secondary-100 btn-block"
                                type="submit" disabled={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Olvidaste tu contraseña?'}
                            </button>

                            <div className="text-center mt-3">
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};
