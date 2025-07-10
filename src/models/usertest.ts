
import { DataTypes, IntegerDataType, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

//  Definición de la interfaz para los atributos del modelo User 
interface UsertestAttributes {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  telefono_alt: string; 
  createdAt?: Date;
  updatedAt?: Date; 
}

interface UsertestCreationAttributes extends Optional<UsertestAttributes,'id'> {} // Se define UserCreationAttributes usando el 
// tipo Optional, para indicar que, al crear un usuario, la propiedad id no es obligatoria. 
// Esto permite que, al insertar un nuevo registro, el id pueda generarse automáticamente.


class Usertest extends Model<UsertestAttributes, UsertestCreationAttributes>
  implements UsertestAttributes {
  id!: number;
  nombre!: string;
  apellido!: string;
  email!: string;
  password!: string;
  telefono!: string;
  telefono_alt!: string;  

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  toJSON() {
    const values = { ...this.get() } as any; // Se obtiene una copia de los valores del modelo 
    delete values.password; // Se elimina el campo password de la respuesta JSON 
    return values;
  }
}

Usertest.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(255), allowNull: false },
  apellido: { type: DataTypes.STRING(255), allowNull: false }, 
  email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
  password: { type: DataTypes.STRING(255), allowNull: false },
  telefono: { type: DataTypes.STRING(20), allowNull: false },
  telefono_alt: { type: DataTypes.STRING(20), allowNull: true },
}, {
  timestamps: true, // Habilita los campos createdAt y updatedAt 
  tableName: 'userstest',
  sequelize
});

export default Usertest;