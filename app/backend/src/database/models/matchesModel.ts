import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teamModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'MatchesModel',
    tableName: 'matches',
    timestamps: false,
  },
);

MatchesModel.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Teams.hasMany(MatchesModel, {
  foreignKey: 'homeTeamId',
  as: 'matchesHome',
});

MatchesModel.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
Teams.hasMany(MatchesModel, {
  foreignKey: 'awayTeamId',
  as: 'matchesAway',
});

export default MatchesModel;
