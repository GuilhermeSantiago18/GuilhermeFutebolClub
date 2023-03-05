import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare password: string;
  declare email: string;
}

User.init({
  id: {
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
    primaryKey: true,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'UsersModel',
  tableName: 'users',
  timestamps: false,
});
