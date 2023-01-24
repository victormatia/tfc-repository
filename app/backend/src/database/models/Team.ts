import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {

}

Team.init({
  id: { allowNull: false, primaryKey: true, type: INTEGER },
  teamName: { allowNull: false, type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
