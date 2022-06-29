const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class PlayDate extends Model {}

PlayDate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // pet_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'pet',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'playdate',
  }
);

module.exports = PlayDate;
