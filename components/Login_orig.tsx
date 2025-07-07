// components/Login.tsx
// Este componente gestiona la pantalla y la lógica de inicio de sesión.
// Se ha actualizado para usar credenciales de prueba locales y no depender de un backend.

import React, { useState } from 'react'; // Importa React y el hook useState.
import { BoxIcon } from './icons/BoxIcon'; // Importa el ícono para el logo.
import { Spinner } from './Spinner'; // Importa el componente de carga.
import { Alert } from './Alert'; // Importa el componente de alerta para errores.

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

    // Renderizado del componente con clases de Bootstrap.
    return (
        <div className="d-flex vh-100 bg-body-tertiary align-items-center justify-content-center">
            <main className="form-signin w-100 m-auto" style={{ maxWidth: '400px' }}>
                <div className="card border-0 shadow-lg">
                    <div className="card-body p-4 p-md-5">
                        <form onSubmit={handleLogin}>
                            <div className="text-center mb-4">
                                <div className="d-inline-block bg-primary-subtle text-primary p-3 rounded-3">
                                   <BoxIcon style={{height: '2.5rem', width: '2.5rem'}} />
                                </div>
                                 <h1 className="h3 my-3 fw-normal">Gestore Login</h1>
                                 <p className="text-muted">Inicia sesión para gestionar tus pedidos</p>
                            </div>

                            {/* Alerta con credenciales de prueba para el usuario */}
                            <Alert type="info" message="Usa testuser y password para ingresar." />
                            
                            {/* Muestra un error si el login falla */}
                            {error && <div className="mt-3"><Alert type="danger" message={error} /></div>}

                            {/* Campo de usuario con `form-floating` de Bootstrap */}
                            <div className="form-floating my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Usuario (testuser)"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label htmlFor="username">Usuario (testuser)</label>
                            </div>
                            
                            {/* Campo de contraseña con `form-floating` */}
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña (password)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Contraseña (password)</label>
                            </div>
                            
                            <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Iniciar Sesión'}
                            </button>
                            <p className="mt-5 mb-3 text-muted text-center">&copy; {new Date().getFullYear()} Gestore</p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};
