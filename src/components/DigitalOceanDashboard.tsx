// Ejemplo de uso de assets en un componente React
import React from 'react';

// Importar estilos CSS
import '../assets/css/variables.css';
import '../assets/css/dashboard.css';

// Importar iconos SVG
import dropletIcon from '../assets/icons/droplet.svg';
import appIcon from '../assets/icons/app.svg';
import databaseIcon from '../assets/icons/database.svg';

const DigitalOceanDashboard: React.FC = () => {
    return (
        <div className="digitalocean-dashboard">
            <header className="dashboard-header">
                <div className="do-container">
                    <nav className="dashboard-nav">
                        <div className="dashboard-logo">
                            <span>🌊</span>
                            <span>DigitalOcean Manager</span>
                        </div>
                        <div className="dashboard-actions">
                            <button className="do-button">Create Resource</button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="dashboard-main">
                <aside className="dashboard-sidebar">
                    <nav>
                        <ul>
                            <li>
                                <a href="#droplets">
                                    <img src={dropletIcon} alt="" width="20" height="20" />
                                    Droplets
                                </a>
                            </li>
                            <li>
                                <a href="#apps">
                                    <img src={appIcon} alt="" width="20" height="20" />
                                    Apps
                                </a>
                            </li>
                            <li>
                                <a href="#databases">
                                    <img src={databaseIcon} alt="" width="20" height="20" />
                                    Databases
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <section className="dashboard-content">
                    <div className="resource-grid">
                        <div className="resource-card">
                            <header className="resource-header">
                                <h2 className="resource-title">
                                    <img src={dropletIcon} alt="" className="resource-icon" />
                                    Droplets
                                </h2>
                                <span className="do-status-badge active">5 Active</span>
                            </header>
                            <div className="resource-stats">
                                <div className="stat-item">
                                    <div className="stat-value">5</div>
                                    <div className="stat-label">Running</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">2</div>
                                    <div className="stat-label">Stopped</div>
                                </div>
                            </div>
                        </div>

                        <div className="resource-card">
                            <header className="resource-header">
                                <h2 className="resource-title">
                                    <img src={appIcon} alt="" className="resource-icon" />
                                    Apps
                                </h2>
                                <span className="do-status-badge pending">2 Deploying</span>
                            </header>
                            <div className="resource-stats">
                                <div className="stat-item">
                                    <div className="stat-value">3</div>
                                    <div className="stat-label">Live</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">2</div>
                                    <div className="stat-label">Building</div>
                                </div>
                            </div>
                        </div>

                        <div className="resource-card">
                            <header className="resource-header">
                                <h2 className="resource-title">
                                    <img src={databaseIcon} alt="" className="resource-icon" />
                                    Databases
                                </h2>
                                <span className="do-status-badge active">1 Active</span>
                            </header>
                            <div className="resource-stats">
                                <div className="stat-item">
                                    <div className="stat-value">1</div>
                                    <div className="stat-label">PostgreSQL</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value">0</div>
                                    <div className="stat-label">Redis</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DigitalOceanDashboard;
