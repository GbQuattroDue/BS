// Ejemplo de uso del MainNavBarLoginIcon
import React from 'react';
import { MainNavBarLoginIcon } from '../icons/MainNavBarLoginIcon';

const App: React.FC = () => {
    const handleLogin = () => {
        console.log('Login clicked');
        // Aquí puedes agregar la lógica de navegación o modal de login
    };

    const handleRegister = () => {
        console.log('Register clicked');
        // Aquí puedes agregar la lógica de navegación o modal de registro
    };

    const handleSupport = () => {
        console.log('Support clicked');
        // Aquí puedes agregar la lógica de soporte (modal, página, etc.)
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    DigitalOcean Manager
                </a>

                {/* Otros elementos del navbar */}

                <MainNavBarLoginIcon
                    onLoginClick={handleLogin}
                    onRegisterClick={handleRegister}
                    onSupportClick={handleSupport}
                />
            </div>
        </nav>
    );
};

export default App;
