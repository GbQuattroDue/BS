import Usertest from '../models/usertest';

export const userstestRepository = {
  findAll: () => Usertest.findAll(),
  findById: (id: number) => Usertest.findByPk(id),
  findByEmail: (email: string) => Usertest.findOne({ where: { email } }),
  create: (data: { nombre: string; apellido: string; email: string; password: string; telefono: string; telefono_alt: string }) =>
    Usertest.create(data),
  update: (id: number, data: Partial<{ nombre: string; apellido: string; email: string; password: string; telefono: string; telefono_alt: string }>) =>
    Usertest.update(data, { where: { id } }),
  delete: (id: number) => Usertest.destroy({ where: { id } })
};

// Este código define un repositorio para interactuar con el modelo Usertest, proporcionando métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los usuarios.
// El repositorio utiliza Sequelize para interactuar con la base de datos y encapsula la lógica
// de acceso a datos, lo que permite mantener el código más limpio y organizado.
// Puedes importar este repositorio en otros archivos de tu aplicación para realizar operaciones sobre los usuarios sin
// tener que preocuparte por los detalles de implementación de la base de datos.