import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {}

Match.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'awayTeamId' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId' });

export default Match;
