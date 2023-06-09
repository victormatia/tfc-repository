import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class User extends Model {

}

User.init({
  id: { allowNull: false, primaryKey: true, type: INTEGER },
  username: { allowNull: false, type: STRING },
  email: { allowNull: false, type: STRING },
  password: { allowNull: false, type: STRING },
  role: { allowNull: false, type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default User;
