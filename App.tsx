
// App.tsx
// Este es el componente principal de la aplicación.
// Gestiona el estado de autenticación y renderiza la pantalla de login o la aplicación principal con el nuevo layout.

import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado.
import { CreateOrderWizard } from './components/CreateOrderWizard'; // Importa el componente principal para crear pedidos.
import { Login } from './components/Login'; // Importa el componente de la pantalla de login.
import { ArrowRightOnRectangleIcon } from './components/icons/ArrowRightOnRectangleIcon'; // Importa el ícono para el botón de logout.
import { CodeBracketIcon } from './components/icons/CodeBracketIcon'; // Importa el ícono para ver el código del backend.
import { Modal } from './components/Modal'; // Importa el componente Modal reutilizable.
import { BackendCodeViewer } from './components/BackendCodeViewer'; // Importa el componente que muestra el código del backend.
import { Sidebar } from './components/Sidebar'; // Importa el nuevo menú lateral.
import { Footer } from './components/Footer'; // Importa el nuevo pie de página.
import { BellIcon } from './components/icons/BellIcon'; // Importa el ícono de notificaciones.
import { SearchIcon } from './components/icons/SearchIcon'; // Importa el ícono de búsqueda.
import './src/assets/css/styles_ges.min.css'; // Importa los estilos globales de la aplicación.

function App() {
  // Estado para la autenticación del usuario.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Estado para controlar la visibilidad del modal del código del backend.
  const [isBackendModalOpen, setIsBackendModalOpen] = useState(false);

  // Función para manejar el cierre de sesión.
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Si el usuario NO está autenticado, muestra la pantalla de Login.
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Si el usuario SÍ está autenticado, muestra el layout principal de la aplicación.
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* 1. Menú Lateral */}
      <Sidebar />

      {/* 2. Contenedor principal (Menú superior + Contenido + Footer) */}
      <div className="d-flex flex-column flex-grow-1">
        {/* 2.1 Menú Superior (Navbar) */}
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            {/* Formulario de búsqueda */}
            <form className="d-flex w-50" role="search">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0" id="basic-addon1">
                  <SearchIcon className="h-5 w-5 text-muted" />
                </span>
                <input
                  className="form-control border-start-0"
                  type="search"
                  placeholder="Buscar pedidos, clientes..."
                  aria-label="Search"
                />
              </div>
            </form>

            {/* Iconos y menú de usuario a la derecha */}
            <div className="d-flex align-items-center">
              <button
                onClick={() => setIsBackendModalOpen(true)}
                className="btn btn-outline-secondary d-flex align-items-center me-3"
                aria-label="View Backend Code"
              >
                <CodeBracketIcon className="h-5 w-5 me-1" />
                <span>Ver Código Backend</span>
              </button>

              <button className="btn btn-link text-secondary" aria-label="Notifications">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Menú desplegable de usuario */}
              <div className="dropdown">
                <button
                  className="btn btn-link text-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="https://i.pravatar.cc/40" className="rounded-circle" alt="User" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" href="#">Perfil</a></li>
                  <li><a className="dropdown-item" href="#">Configuración</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item d-flex align-items-center text-danger">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* 2.2 Contenido Principal de la Página */}
        <main className="flex-grow-1 p-4">
          <CreateOrderWizard />
        </main>

        {/* 2.3 Pie de Página */}
        <Footer />
      </div>

      {/* Modal para mostrar el código del backend */}
      <Modal isOpen={isBackendModalOpen} onClose={() => setIsBackendModalOpen(false)}>
        <BackendCodeViewer />
      </Modal>

    </div>
  );
}

export default App;
