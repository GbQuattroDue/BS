import React, { useState } from 'react';
import {
    getIconClass,
    searchIcons,
    getIconsByCategory,
    iconExists,
    getIconInfo,
    ICON_CATEGORIES,
    IconName
} from './index';

/**
 * Componente de ejemplo que demuestra el uso del sistema de iconos IcoMoon
 * 
 * Este componente muestra:
 * - Cómo usar iconos en la interfaz
 * - Búsqueda de iconos
 * - Navegación por categorías
 * - Validación de iconos
 */
const IconShowcase: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof ICON_CATEGORIES>('home');
    const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null);

    // Buscar iconos basado en el término de búsqueda
    const searchResults = searchTerm ? searchIcons(searchTerm) : [];

    // Obtener iconos de la categoría seleccionada
    const categoryIcons = getIconsByCategory(selectedCategory);

    // Iconos para mostrar en ejemplos comunes
    const commonIcons: IconName[] = [
        'home', 'user', 'cog', 'eye', 'heart5', 'star-full2',
        'cart', 'envelop', 'phone', 'calendar', 'download', 'upload'
    ];

    return (
        <div className="icon-showcase p-4">
            <div className="container-fluid">
                <h1 className="mb-4">
                    <i className={getIconClass('star-full2')} />
                    Sistema de Iconos IcoMoon
                </h1>

                {/* Sección de iconos comunes */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h3>
                            <i className={getIconClass('home')} />
                            Iconos Comunes
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {commonIcons.map(icon => (
                                <div key={icon} className="col-md-2 col-sm-3 col-4 mb-3">
                                    <div className="text-center p-3 border rounded">
                                        <i className={`${getIconClass(icon)} icon-2x d-block mb-2`} />
                                        <small className="text-muted">{icon}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Búsqueda de iconos */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h3>
                            <i className={getIconClass('eye')} />
                            Buscar Iconos
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar iconos... (ej: home, user, arrow)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {searchTerm && (
                            <div>
                                <p>
                                    <strong>{searchResults.length}</strong> iconos encontrados para "{searchTerm}"
                                </p>
                                <div className="row">
                                    {searchResults.slice(0, 12).map(icon => (
                                        <div key={icon} className="col-md-2 col-sm-3 col-4 mb-3">
                                            <div
                                                className="text-center p-2 border rounded cursor-pointer"
                                                onClick={() => setSelectedIcon(icon)}
                                            >
                                                <i className={`${getIconClass(icon)} icon-2x d-block mb-1`} />
                                                <small className="text-muted">{icon}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {searchResults.length > 12 && (
                                    <p className="text-muted">
                                        ... y {searchResults.length - 12} iconos más
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navegación por categorías */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h3>
                            <i className={getIconClass('grid')} />
                            Explorar por Categorías
                        </h3>
                    </div>
                    <div className="card-body">
                        {/* Selector de categorías */}
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value as keyof typeof ICON_CATEGORIES)}
                            >
                                {Object.keys(ICON_CATEGORIES).map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Iconos de la categoría seleccionada */}
                        <div className="row">
                            {Array.from(categoryIcons).slice(0, 16).map(icon => (
                                <div key={icon} className="col-md-2 col-sm-3 col-4 mb-3">
                                    <div
                                        className="text-center p-2 border rounded cursor-pointer"
                                        onClick={() => setSelectedIcon(icon)}
                                    >
                                        <i className={`${getIconClass(icon)} icon-2x d-block mb-1`} />
                                        <small className="text-muted">{icon}</small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {categoryIcons.length > 16 && (
                            <p className="text-muted">
                                ... y {categoryIcons.length - 16} iconos más en esta categoría
                            </p>
                        )}
                    </div>
                </div>

                {/* Información del icono seleccionado */}
                {selectedIcon && (
                    <div className="card mb-4">
                        <div className="card-header">            <h3>
                            <i className={getIconClass('bubble-notification')} />
                            Información del Icono
                        </h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 text-center">
                                    <i className={`${getIconClass(selectedIcon)} icon-5x d-block mb-3`} />
                                </div>
                                <div className="col-md-9">
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <th>Nombre:</th>
                                                <td><code>{selectedIcon}</code></td>
                                            </tr>
                                            <tr>
                                                <th>Clase CSS:</th>
                                                <td><code>{getIconClass(selectedIcon)}</code></td>
                                            </tr>
                                            <tr>
                                                <th>Categoría:</th>
                                                <td>{getIconInfo(selectedIcon)?.category}</td>
                                            </tr>
                                            <tr>
                                                <th>Uso en JSX:</th>
                                                <td><code>{`<i className={getIconClass('${selectedIcon}')} />`}</code></td>
                                            </tr>
                                            <tr>
                                                <th>Uso en HTML:</th>
                                                <td><code>{`<i class="${getIconClass(selectedIcon)}"></i>`}</code></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ejemplos de uso */}
                <div className="card mb-4">
                    <div className="card-header">
                        <h3>
                            <i className={getIconClass('code')} />
                            Ejemplos de Uso
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {/* Botones con iconos */}
                            <div className="col-md-6 mb-4">
                                <h5>Botones con Iconos</h5>
                                <div className="d-flex gap-2 flex-wrap">
                                    <button className="btn btn-primary">
                                        <i className={getIconClass('plus3')} /> Crear
                                    </button>
                                    <button className="btn btn-success">
                                        <i className={getIconClass('checkmark')} /> Guardar
                                    </button>
                                    <button className="btn btn-warning">
                                        <i className={getIconClass('pencil')} /> Editar
                                    </button>
                                    <button className="btn btn-danger">
                                        <i className={getIconClass('bin')} /> Eliminar
                                    </button>
                                </div>
                            </div>

                            {/* Navegación */}
                            <div className="col-md-6 mb-4">
                                <h5>Navegación</h5>
                                <nav className="nav nav-pills flex-column">
                                    <a className="nav-link active" href="#">
                                        <i className={getIconClass('home')} /> Inicio
                                    </a>
                                    <a className="nav-link" href="#">
                                        <i className={getIconClass('users')} /> Usuarios
                                    </a>
                                    <a className="nav-link" href="#">
                                        <i className={getIconClass('chart')} /> Reportes
                                    </a>
                                    <a className="nav-link" href="#">
                                        <i className={getIconClass('cog')} /> Configuración
                                    </a>
                                </nav>
                            </div>

                            {/* Tamaños */}
                            <div className="col-md-6 mb-4">
                                <h5>Diferentes Tamaños</h5>
                                <div className="d-flex align-items-center gap-3">
                                    <i className={`${getIconClass('heart5')} icon-1x`} title="1x" />
                                    <i className={`${getIconClass('heart5')} icon-2x`} title="2x" />
                                    <i className={`${getIconClass('heart5')} icon-3x`} title="3x" />
                                    <i className={`${getIconClass('heart5')} icon-4x`} title="4x" />
                                </div>
                            </div>

                            {/* Estados y colores */}
                            <div className="col-md-6 mb-4">
                                <h5>Estados y Colores</h5>
                                <div className="d-flex gap-3">
                                    <i className={`${getIconClass('checkmark')} text-success icon-2x`} />
                                    <i className={`${getIconClass('warning')} text-warning icon-2x`} />
                                    <i className={`${getIconClass('cross2')} text-danger icon-2x`} />
                                    <i className={`${getIconClass('bubble-notification')} text-info icon-2x`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Validación de iconos */}
                <div className="card">
                    <div className="card-header">
                        <h3>
                            <i className={getIconClass('shield-check')} />
                            Validación de Iconos
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Iconos Válidos</h5>
                                {['home', 'user', 'settings'].map(icon => (
                                    <div key={icon} className="mb-2">
                                        <code>{icon}</code>: {iconExists(icon) ?
                                            <span className="text-success">
                                                <i className={getIconClass('checkmark')} /> Válido
                                            </span> :
                                            <span className="text-danger">
                                                <i className={getIconClass('cross2')} /> No válido
                                            </span>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <h5>Iconos No Válidos</h5>
                                {['invalid-icon', 'fake-icon', 'nonexistent'].map(icon => (
                                    <div key={icon} className="mb-2">
                                        <code>{icon}</code>: {iconExists(icon) ?
                                            <span className="text-success">
                                                <i className={getIconClass('checkmark')} /> Válido
                                            </span> :
                                            <span className="text-danger">
                                                <i className={getIconClass('cross2')} /> No válido
                                            </span>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IconShowcase;
